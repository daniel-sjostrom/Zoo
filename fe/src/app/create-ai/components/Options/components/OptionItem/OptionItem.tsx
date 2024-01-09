import { useState } from "react";

import commonStyles from "@/styles/common.module.css";
import { AvailableModel } from "@/app/stores/useAIStore";
import Shadow from "@/components/Shadow";

import styles from "./OptionItem.module.css";

interface Props {
    option: AvailableModel;
    isSelected: boolean;
    onSelect: (arg: AvailableModel) => void;
}

export const OptionItem: React.FC<Props> = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const onMouseOver = () => {
        if (props.isSelected === false) {
            setIsHovering(true);
        }
    };

    const onMouseOut = () => {
        setIsHovering(false);
    };

    const onClick = () => {
        props.onSelect(props.option);
    };

    return (
        <Shadow>
            <button
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                className={`${styles.card} ${
                    props.isSelected && styles.isSelected
                } ${isHovering && styles.hover}`}
            >
                <div className={styles.textContainer}>
                    <h3
                        className={`${props.isSelected && styles.isSelectedh3}`}
                    >
                        {props.option.name}
                    </h3>
                    <div className={commonStyles.space1} />
                    <p className={`${props.isSelected && styles.isSelectedp}`}>
                        {props.option.description}
                    </p>
                </div>
                <h2>{props.isSelected ? "✅" : "✨"}</h2>
            </button>
            {isHovering && <div className={styles.hoverShadow} />}
        </Shadow>
    );
};

export default OptionItem;
