import Shadow from "../Shadow";
import styles from "./Box.module.css";

interface Props {
    children: React.ReactNode;
}

const Box: React.FC<Props> = (props) => {
    return (
        <Shadow>
            <div className={styles.container}>{props.children}</div>
        </Shadow>
    );
};

export default Box;
