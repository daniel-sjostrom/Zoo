import React, { useState } from "react";

import styles from "./Button.module.css";

interface Props {
    secondaryButton?: boolean;
    children: string;
    onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseOver = () => {
        setIsHovering(true);
    };

    const onMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div>
            <button
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={props.onClick}
                className={`${styles.button} ${
                    props.secondaryButton && styles.secondaryButton
                }`}
            >
                {props.children}
            </button>
            {isHovering && <div className={styles.buttonHoverShadow} />}
        </div>
    );
};

export default Button;
