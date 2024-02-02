import { ChatHistory as ChatHistoryType } from "@/app/stores/useChat";
import commonStyles from "@/styles/common.module.css";

import styles from "./ChatHistory.module.css";
import Box from "@/components/Box";

interface Props {
    aiSettingsName: string | undefined;
    streamingResponse: string[];
    history: ChatHistoryType[];
}

// className={`${styles.button} ${isHovered && styles.hovered} ${
//     props.disabled && styles.disabled
// }`}

const ChatHistory: React.FC<Props> = (props) => {
    return (
        <div className={styles.container}>
            {props.history.map((item, i) => (
                <>
                    <div
                        key={i}
                        className={`${styles.youContainer} ${
                            i % 2 === 0 && styles.backgroundColor
                        }`}
                    >
                        <div>
                            <h4>You</h4>
                            <div className={commonStyles.space1} />
                            <p>{item.prompt}</p>
                        </div>
                        <div className={commonStyles.space6} />
                        <div>
                            <h4>{props.aiSettingsName}</h4>
                            <div className={commonStyles.space1} />
                            {item.response.length > 0 ? (
                                <>
                                    <p>{item.response}</p>
                                    <div className={commonStyles.space6} />
                                </>
                            ) : (
                                <>
                                    <p>{props.streamingResponse}</p>
                                    <div className={commonStyles.space6} />
                                </>
                            )}
                        </div>
                    </div>
                    <div className={commonStyles.space6} />
                </>
            ))}
        </div>
    );
};

export default ChatHistory;
