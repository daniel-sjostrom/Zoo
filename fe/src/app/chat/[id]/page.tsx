"use client";

import { useState } from "react";

import Input from "@/components/Input";
import Button from "@/components/Button";
import useChat from "@/app/stores/useChat";
import { copy } from "@/copy/en";
import useCreateNew from "@/hooks/useCreateNew";
import { Vertical8 } from "@/components/HorizontalVertical/Vertical";

import styles from "./page.module.css";
import Chat from "./components/Chat";
import useSubmitPrompt from "./hooks/useSubmitPrompt";
import SendButton from "./components/SendButton";
import { Horizontal2 } from "@/components/HorizontalVertical/Horizontal";

const ChatPage: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const handleSubmit = useSubmitPrompt(inputText, setInputText);
    const eventSourceData = useChat((state) => state.eventSourceData);
    const handleCreate = useCreateNew();

    return (
        <main className={styles.main}>
            <Button text={copy.chat_create_new} onClick={handleCreate} />
            <div className={styles.chat}>
                <div>
                    <Vertical8 />
                    <Chat />
                </div>
                <div>
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
                    <Vertical8 />
                </div>
            </div>
        </main>
    );
};

export default ChatPage;
