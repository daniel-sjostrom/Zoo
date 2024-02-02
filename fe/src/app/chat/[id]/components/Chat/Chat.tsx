import useChat from "@/app/stores/useChat";
import commonStyles from "@/styles/common.module.css";

import styles from "./Chat.module.css";
import You from "./components/You";
import AI from "./components/AI";
import useAiSettingsName from "./hooks/useAiSettingsName";

const Chat: React.FC = () => {
    const chatEventSourceData = useChat((state) => state.eventSourceData);
    const aiSettingsName = useAiSettingsName();

    return (
        <div className={styles.container}>
            {chatEventSourceData.chatHistory.map((item, i) => (
                <>
                    <div
                        key={i}
                        className={`${styles.chatBox} ${
                            i % 2 === 0 && styles.backgroundColor
                        }`}
                    >
                        <You prompt={item.prompt} />
                        <div className={commonStyles.space6} />
                        <AI
                            aiSettingsName={aiSettingsName}
                            response={item.response}
                            streamingResponse={
                                chatEventSourceData.streamingResponse
                            }
                        />
                    </div>
                    <div className={commonStyles.space6} />
                </>
            ))}
        </div>
    );
};

export default Chat;
