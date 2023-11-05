import React from "react";

import styles from "./Button.module.css";

interface Props {
    children: string;
    onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button onClick={props.onClick} className={styles.button}>
            {props.children}
        </button>
    );
};

export default Button;
