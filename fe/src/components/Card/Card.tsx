import styles from "./Card.module.css";

interface Props {
    children: React.ReactNode;
    isQuestion?: boolean;
}

const Card: React.FC<Props> = (props) => {
    return (
        <div
            className={`${styles.main} ${props.isQuestion && styles.question}`}
        >
            {props.children}
        </div>
    );
};

export default Card;
