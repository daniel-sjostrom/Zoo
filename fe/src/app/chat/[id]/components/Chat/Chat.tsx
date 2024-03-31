import React from "react";

import useChat from "@/app/stores/useChat";
import { Vertical6 } from "@/components/HorizontalVertical/Vertical";

import styles from "./Chat.module.css";
import You from "./components/You";
import AI from "./components/AI";

const Chat: React.FC = () => {
    const chatEventSourceData = useChat((state) => state.eventSourceData);

    return (
        <div className={styles.container}>
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
