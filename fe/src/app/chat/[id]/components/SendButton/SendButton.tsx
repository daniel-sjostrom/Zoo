import React, { useState } from "react";

import styles from "./SendButton.module.css";

interface Props {
    disabled?: boolean | undefined;
    text: string;
    onClick?: () => void;
}

const SendButton: React.FC<Props> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`${styles.button} ${props.disabled && styles.disabled}`}
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
};

export default SendButton;
