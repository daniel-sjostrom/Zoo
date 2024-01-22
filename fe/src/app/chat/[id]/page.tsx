"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import useChat from "@/app/stores/useChat";
import Input from "@/components/Input";
import commonStyles from "@/styles/common.module.css";
import Button from "@/components/Button";

import styles from "./page.module.css";
import ChatHistory from "./components/ChatHistory";

const Chat: React.FC = () => {
    const params = useParams();
    const [userID] = useLocalStorage<string>(LocalStorageKey.UserID);
    const chatEventSource = useChat((state) => state.eventSource);
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const [inputText, setInputText] = useState("");
    const [prompts, setPrompts] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPrompts([...prompts, inputText]);
        setInputText("");
        await chatEventSource({
            userID,
            aiID: params.id as string,
            prompt: inputText,
        });
    };

    return (
        <main className={styles.main}>
            <h2>Chat 🤖</h2>
            <ChatHistory
                history={chatEventSourceData.history}
                response={chatEventSourceData.response}
            />
            <div>
                <form className={styles.chatForm} onSubmit={handleSubmit}>
                    <Input onChange={setInputText} value={inputText} />
                    <div className={commonStyles.space_horizontal4} />
                    <Button disabled={inputText.length === 0}>↑</Button>
                </form>
                <div className={commonStyles.space8} />
            </div>
        </main>
    );
};

export default Chat;
