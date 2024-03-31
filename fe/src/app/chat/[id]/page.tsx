"use client";

import { useEffect, useRef, useState } from "react";

import Input from "@/components/Input";
import Button from "@/components/Button";
import useChat from "@/app/stores/useChat";
import { copy } from "@/copy/en";
import useCreateNew from "@/hooks/useCreateNew";
import { Vertical2, Vertical8 } from "@/components/HorizontalVertical/Vertical";
import { Horizontal2 } from "@/components/HorizontalVertical/Horizontal";

import styles from "./page.module.css";
import Chat from "./components/Chat";
import useSubmitPrompt from "./hooks/useSubmitPrompt";
import SendButton from "./components/SendButton";

const ChatPage: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const handleSubmit = useSubmitPrompt(inputText, setInputText);
    const eventSourceData = useChat((state) => state.eventSourceData);
    const handleCreate = useCreateNew();

    // TODO Move this to a separate hook
    const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollBarRef = chatContainerRef.current;
        const onScroll = () => {
            if (!scrollBarRef) {
                return;
            }

            const isAtBottom =
                scrollBarRef.scrollHeight - scrollBarRef.scrollTop ===
                scrollBarRef.clientHeight;
            setIsUserScrolledUp(!isAtBottom);
        };

        scrollBarRef?.addEventListener("scroll", onScroll);

        return () => scrollBarRef?.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (chatContainerRef.current && !isUserScrolledUp) {
            const { scrollHeight } = chatContainerRef.current;
            chatContainerRef.current.scrollTo({ top: scrollHeight });
        }
    }, [chatEventSourceData.chatHistory, isUserScrolledUp]);

    return (
        <main className={styles.main} ref={chatContainerRef}>
            <Button text={copy.chat_create_new} onClick={handleCreate} />
            <div className={styles.chatAndInput}>
                <div className={styles.chat}>
                    <Vertical8 />
                    <Chat />
                </div>
                <div className={styles.formContainer}>
                    <Vertical2 />
                    <form className={styles.chatForm} onSubmit={handleSubmit}>
                        <Input onChange={setInputText} value={inputText} />
                        <Horizontal2 />
                        <SendButton
                            disabled={
                                inputText.length === 0 ||
                                eventSourceData.streamingResponse.length > 0
                            }
                            text={"↑"}
                        />
                    </form>
                    <Vertical2 />
                </div>
            </div>
        </main>
    );
};

export default ChatPage;
