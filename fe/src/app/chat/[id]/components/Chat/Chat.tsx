import useChat from "@/app/stores/useChat";

import styles from "./Chat.module.css";
import You from "./components/You";
import AI from "./components/AI";
import { Vertical6 } from "@/components/HorizontalVertical/Vertical";

const Chat: React.FC = () => {
    const chatEventSourceData = useChat((state) => state.eventSourceData);

    return (
        <div className={styles.container}>
            {chatEventSourceData.chatHistory.map((item, i) => (
                <>
                    <div key={i}>
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
                </>
            ))}
        </div>
    );
};

export default Chat;
