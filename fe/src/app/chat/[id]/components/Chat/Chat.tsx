import useChat from "@/app/stores/useChat";
import commonStyles from "@/styles/common.module.css";

import styles from "./Chat.module.css";
import You from "./components/You";
import AI from "./components/AI";

const Chat: React.FC = () => {
    const chatEventSourceData = useChat((state) => state.eventSourceData);

    return (
        <div className={styles.container}>
            {chatEventSourceData.chatHistory.map((item, i) => (
                <>
                    <div key={i}>
                        <You prompt={item.prompt} />
                        <div className={commonStyles.space6} />
                        <AI
                            aiSettingsName={"AI"}
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
