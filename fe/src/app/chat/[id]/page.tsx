"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import useChat from "@/app/stores/useChat";
import Input from "@/components/Input";
import commonStyles from "@/styles/common.module.css";
import Button from "@/components/Button";

import styles from "./page.module.css";
import ChatHistory from "./components/ChatHistory";
import useChatHistory from "@/app/stores/useChatHistory";

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

    const postChatHistory = useChatHistory((state) => state.post);
    const chatHistoryData = useChatHistory((state) => state.postData);

    useEffect(() => {
        // TODO Figure out how to do this without a useEffect?
        // Maybe update a state when the fullresponse is received
        // How to save the input text but still remove it for the user after they hit send?
        postChatHistory({
            ai_id: params.id as string,
            prompt: inputText,
            response: chatEventSourceData.fullResponse,
            user_id: userID,
        });
    }, [
        chatEventSourceData.fullResponse,
        inputText,
        params.id,
        postChatHistory,
        userID,
    ]);

    return (
        <main className={styles.main}>
            <h2>Chat 🤖</h2>
            <ChatHistory
                history={chatEventSourceData.fullResponse}
                response={chatEventSourceData.streamingResponse}
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
