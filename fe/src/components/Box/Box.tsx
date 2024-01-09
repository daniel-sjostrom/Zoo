import styles from "./Box.module.css";

interface Props {
    children: React.ReactNode;
}

const Box: React.FC<Props> = (props) => {
    return <div className={styles.container}>{props.children}</div>;
};

export default Box;
