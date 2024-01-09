import { useState } from "react";

import commonStyles from "@/styles/common.module.css";
import { AvailableModel } from "@/app/stores/useAIStore";

import styles from "./Option.module.css";

interface Props {
    option: AvailableModel;
    onClick: (arg: AvailableModel) => void;
}

export const Option: React.FC<Props> = (props) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const onMouseOver = () => {
        if (isSelected === false) {
            setIsHovering(true);
        }
    };

    const onMouseOut = () => {
        setIsHovering(false);
    };

    const onClick = () => {
        props.onClick(props.option);
        setIsSelected(true);
    };

    return (
        <div>
            <button
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                className={`${styles.card} ${isSelected && styles.isSelected} ${
                    isHovering && styles.hover
                }`}
            >
                <div className={styles.textContainer}>
                    <h3 className={`${isSelected && styles.isSelectedh3}`}>
                        {props.option.name}
                    </h3>
                    <div className={commonStyles.space1} />
                    <p className={`${isSelected && styles.isSelectedp}`}>
                        {props.option.description}
                    </p>
                </div>
                <h2>{isSelected ? "✅" : "✨"}</h2>
            </button>
            {isHovering && <div className={styles.hoverShadow} />}
        </div>
    );
};

export default Option;
