import { useEffect, useRef } from "react";
import React from "react";

import useChat from "@/app/stores/useChat";
import { Vertical6 } from "@/components/HorizontalVertical/Vertical";

import styles from "./Chat.module.css";
import You from "./components/You";
import AI from "./components/AI";

const Chat: React.FC = () => {
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            console.log("I am scrolling");
            const { scrollHeight } = chatContainerRef.current;
            console.log(scrollHeight);
            chatContainerRef.current.scrollTo({ top: scrollHeight });
        }
    }, [chatEventSourceData.chatHistory]);

    // TODO remove double scroll bars and tidy it up
    return (
        <div className={styles.container} ref={chatContainerRef}>
            {chatEventSourceData.chatHistory.map((item, i) => (
                <React.Fragment key={i}>
                    <div>
                        <You prompt={item.prompt} />
                        <Vertical6 />
                        <AI
                            aiSettingsName={"AI"}
                            response={item.response}
                            streamingResponse={
                                chatEventSourceData.streamingResponse
                            }
                        />
                    </div>
                    <Vertical6 />
                </React.Fragment>
            ))}
        </div>
    );
};

export default Chat;
