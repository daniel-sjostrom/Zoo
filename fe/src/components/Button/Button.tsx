import React, { useState } from "react";

import styles from "./Button.module.css";

interface Props {
    disabled?: boolean;
    children: string;
    onClick?: () => void;
}

const Button: React.FC<Props> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleLeave = () => {
        setIsHovered(false);
    };

    return (
        <div>
            <button
                onClick={props.onClick}
                className={`${styles.button} ${isHovered && styles.hovered} ${
                    props.disabled && styles.disabled
                }`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
                disabled={props.disabled}
            >
                {props.children}
            </button>
        </div>
    );
};

export default Button;
