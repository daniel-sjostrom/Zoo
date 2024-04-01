import { useEffect, useRef, useState } from "react";

import useChat from "@/app/stores/useChat";

// Used for giving a little bit of padding when checking if the user is at the bottom
const PADDING = 30;

const useScrollFollow = () => {
    const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Stops the auto scroll when scrolling up
    useEffect(() => {
        const scrollBarRef = chatContainerRef.current;
        const onScroll = () => {
            if (!scrollBarRef) {
                return;
            }

            const isAtBottom =
                scrollBarRef.scrollHeight - scrollBarRef.scrollTop <
                scrollBarRef.clientHeight + PADDING;
            setIsUserScrolledUp(!isAtBottom);
        };

        scrollBarRef?.addEventListener("scroll", onScroll);

        return () => scrollBarRef?.removeEventListener("scroll", onScroll);
    }, []);

    // Auto scrolls to the bottom when new text is generated
    useEffect(() => {
        if (chatContainerRef.current && !isUserScrolledUp) {
            const { scrollHeight } = chatContainerRef.current;
            chatContainerRef.current.scrollTo({ top: scrollHeight });
        }
    }, [chatEventSourceData.chatHistory, isUserScrolledUp]);

    return chatContainerRef;
};

export default useScrollFollow;
