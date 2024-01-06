import React, { useState } from "react";

import styles from "./Button.module.css";

interface Props {
    secondaryButton?: boolean;
    children: string;
    onClick: () => void;
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
                className={`${styles.button} ${isHovered && styles.hovered}`}
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
            >
                {props.children}
            </button>
        </div>
    );
    // return (
    //     <div className={styles.main}>
    //         <div className={styles.container}>
    //             <button
    //                 onClick={props.onClick}
    //                 className={`${styles.button} ${
    //                     props.secondaryButton && styles.secondaryButton
    //                 }`}
    //             >
    //                 {props.children}
    //             </button>
    //             <div className={styles.hoverShadow} />
    //         </div>
    //     </div>
    // );
};

export default Button;
