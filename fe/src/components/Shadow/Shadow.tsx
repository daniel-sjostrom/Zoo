import styles from "./Shadow.module.css";

interface Props {
    children: React.ReactNode;
}

const Shadow: React.FC<Props> = (props) => {
    return <div className={styles.shadow}>{props.children}</div>;
};

export default Shadow;
