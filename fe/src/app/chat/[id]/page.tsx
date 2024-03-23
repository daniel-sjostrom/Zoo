"use client";

import { useState } from "react";

import Input from "@/components/Input";
import commonStyles from "@/styles/common.module.css";
import Button from "@/components/Button";
import useChat from "@/app/stores/useChat";
import { copy } from "@/copy/en";
import useCreateNew from "@/hooks/useCreateNew";

import styles from "./page.module.css";
import Chat from "./components/Chat";
import useSubmitPrompt from "./hooks/useSubmitPrompt";

const ChatPage: React.FC = () => {
    const [inputText, setInputText] = useState("");
    const handleSubmit = useSubmitPrompt(inputText, setInputText);
    const eventSourceData = useChat((state) => state.eventSourceData);
    const handleCreate = useCreateNew();
    // TODO adjust the components here to match
    return (
        <main className={styles.main}>
            <Button text={copy.chat_create_new} onClick={handleCreate} />
            <div className={styles.chat}>
                <div>
                    <div className={commonStyles.space8} />
                    <Chat />
                </div>
                <div>
                    <form className={styles.chatForm} onSubmit={handleSubmit}>
                        <Input onChange={setInputText} value={inputText} />
                        <div className={commonStyles.space_horizontal4} />
                        <Button
                            disabled={
                                inputText.length === 0 ||
                                eventSourceData.streamingResponse.length > 0
                            }
                            text={"↑"}
                        />
                    </form>
                    <div className={commonStyles.space8} />
                </div>
            </div>
        </main>
    );
};

export default ChatPage;
