"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.css";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import useAISettings from "@/app/stores/useAISettings";
import { useEffect } from "react";

const Chat: React.FC = () => {
    const params = useParams();
    // TODO Figure out why user id is undefined
    const [userId] = useLocalStorage<string>(LocalStorageKey.UserID);
    const getAISettings = useAISettings((state) => state.get);
    const AISettingsGetData = useAISettings((state) => state.getData);

    useEffect(() => {
        getAISettings({ user_id: userId, ai_id: params.id as string });
    }, [getAISettings, params.id, userId]);

    return (
        <main className={styles.main}>
            <h2>Chat 🤖</h2>
            <h2>{AISettingsGetData?.ai_id}</h2>
            <h2>{AISettingsGetData?.model}</h2>
            <h2>{AISettingsGetData?.name}</h2>
            <h2>{AISettingsGetData?.user_id}</h2>
        </main>
    );
};

export default Chat;
