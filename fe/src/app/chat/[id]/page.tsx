"use client";

import { useParams } from "next/navigation";

import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import useAISettings from "@/app/stores/useAISettings";
import { useEffect } from "react";
import useChat from "@/app/stores/useChat";

import styles from "./page.module.css";

// TODO Add the possbility to write any prompt
const Chat: React.FC = () => {
    const params = useParams();
    const [userID] = useLocalStorage<string>(LocalStorageKey.UserID);
    const AISettingsGetData = useAISettings((state) => state.getData);
    const { eventSourceData, eventSource } = useChat();

    useEffect(() => {
        eventSource({
            userID,
            aiID: params.id as string,
            prompt: "Hello, who are you?",
        });
    }, [eventSource, params.id, userID]);

    return (
        <main className={styles.main}>
            <h2>Chat 🤖</h2>
            {eventSourceData && <p>Received: {eventSourceData.response}</p>}
            <h2>{AISettingsGetData?.ai_id}</h2>
            <h2>{AISettingsGetData?.model}</h2>
            <h2>{AISettingsGetData?.name}</h2>
            <h2>{AISettingsGetData?.user_id}</h2>
        </main>
    );
};

export default Chat;
