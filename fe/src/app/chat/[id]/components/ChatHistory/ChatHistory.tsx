import styles from "./ChatHistory.module.css";

interface Props {
    history: string[];
    response: string[];
}

const ChatHistory: React.FC<Props> = (props) => {
    return (
        <div className={styles.container}>
            <p>{props.history}</p>
            <p>{props.response}</p>
        </div>
    );
};

export default ChatHistory;
