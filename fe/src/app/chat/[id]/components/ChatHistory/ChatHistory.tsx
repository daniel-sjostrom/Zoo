import { ChatHistory as ChatHistoryType } from "@/app/stores/useChat";
import commonStyles from "@/styles/common.module.css";

import styles from "./ChatHistory.module.css";
import You from "./components/You";
import AI from "./components/AI";

interface Props {
    aiSettingsName: string | undefined;
    streamingResponse: string[];
    history: ChatHistoryType[];
}

const ChatHistory: React.FC<Props> = (props) => {
    return (
        <div className={styles.container}>
            {props.history.map((item, i) => (
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
                            aiSettingsName={props.aiSettingsName}
                            response={item.response}
                            streamingResponse={props.streamingResponse}
                        />
                    </div>
                    <div className={commonStyles.space6} />
                </>
            ))}
        </div>
    );
};

export default ChatHistory;
