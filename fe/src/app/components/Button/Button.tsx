import React from "react";

import styles from "./Button.module.css";

interface Props {
    text: string;
    onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button onClick={props.onClick} className={styles.button}>
            {props.text}
        </button>
    );
};

export default Button;
