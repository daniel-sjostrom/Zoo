"use client";

import React, { useState, ChangeEvent } from "react";
import commonStyles from "@/styles/common.module.css";

import styles from "./Options.module.css";
import { AvailableModel } from "@/app/stores/useAIStore";

interface OptionProps {
    option: AvailableModel;
    onClick: (arg: AvailableModel) => void;
}

export const Option: React.FC<OptionProps> = (props) => {
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
        setIsSelected(true);
        props.onClick(props.option);
    };

    return (
        <div>
            <button
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                className={`${styles.optionCard} ${
                    isSelected && styles.isSelected
                } ${isHovering && styles.hover}`}
            >
                <div className={styles.optionText}>
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
            {isHovering && <div className={styles.optionCardHoverShadow} />}
        </div>
    );
};

interface Props {
    options: AvailableModel[] | undefined;
    onClick: (selectedValue: AvailableModel) => void;
}

const Options: React.FC<Props> = (props) => {
    return props.options?.map((option, index) => (
        <div key={index}>
            <Option onClick={props.onClick} option={option} />
            <div className={commonStyles.space2} />
        </div>
    ));
};

export default Options;
