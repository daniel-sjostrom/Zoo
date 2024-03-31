import { useEffect, useRef, useState } from "react";

import useChat from "@/app/stores/useChat";

const useScrollFollow = () => {
    const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Sets isUserScrolledUp to true if user scrolls up
    useEffect(() => {
        const scrollBarRef = chatContainerRef.current;
        const onScroll = () => {
            if (!scrollBarRef) {
                return;
            }
            // TODO adjust this so that there are room for margin of error
            const isAtBottom =
                scrollBarRef.scrollHeight - scrollBarRef.scrollTop ===
                scrollBarRef.clientHeight;
            setIsUserScrolledUp(!isAtBottom);
        };

        scrollBarRef?.addEventListener("scroll", onScroll);

        return () => scrollBarRef?.removeEventListener("scroll", onScroll);
    }, []);

    // Scrolls to the bottom of the chat container
    useEffect(() => {
        if (chatContainerRef.current && !isUserScrolledUp) {
            const { scrollHeight } = chatContainerRef.current;
            chatContainerRef.current.scrollTo({ top: scrollHeight });
        }
    }, [chatEventSourceData.chatHistory, isUserScrolledUp]);

    return chatContainerRef;
};

export default useScrollFollow;
