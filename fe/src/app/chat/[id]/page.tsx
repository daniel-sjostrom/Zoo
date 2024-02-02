"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import useChat from "@/app/stores/useChat";
import Input from "@/components/Input";
import commonStyles from "@/styles/common.module.css";
import Button from "@/components/Button";
import useAISettings from "@/app/stores/useAISettings";

import styles from "./page.module.css";
import ChatHistory from "./components/ChatHistory";

const Chat: React.FC = () => {
    const params = useParams();
    const [userID] = useLocalStorage<string>(LocalStorageKey.UserID);
    const chatEventSource = useChat((state) => state.eventSource);
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const aiSettingsData = useAISettings((state) => state.getData);
    const getAiSettings = useAISettings((state) => state.get);
    const [inputText, setInputText] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInputText("");
        await chatEventSource({
            user_id: userID,
            ai_id: params.id as string,
            prompt: inputText,
        });
    };

    useEffect(() => {
        if (aiSettingsData === undefined) {
            getAiSettings({ user_id: userID, ai_id: params.id as string });
        }
    }, [aiSettingsData, getAiSettings, params.id, userID]);

    return (
        <main className={styles.main}>
            <div>
                <div className={commonStyles.space8} />
                <ChatHistory
                    history={chatEventSourceData.chatHistory}
                    streamingResponse={chatEventSourceData.streamingResponse}
                    aiSettingsName={aiSettingsData?.name}
                />
            </div>
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
