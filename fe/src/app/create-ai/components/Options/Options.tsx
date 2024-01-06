"use client";

import React, { useState, ChangeEvent } from "react";
import commonStyles from "@/styles/common.module.css";

import styles from "./Options.module.css";
import { AvailableModel } from "@/app/stores/useAIStore";

interface OptionProps {
    option: AvailableModel;
    onClick: (arg: AvailableModel) => void;
}

const Option: React.FC<OptionProps> = (props) => {
    const [isHovering, setIsHovering] = useState(false);

    const onMouseOver = () => {
        setIsHovering(true);
    };

    const onMouseOut = () => {
        setIsHovering(false);
    };

    const onClick = () => {
        props.onClick(props.option);
    };

    return (
        <div>
            <button
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                className={styles.button}
            >
                <div className={styles.optionContent}>
                    <div className={styles.optionText}>
                        <h3>{props.option.name}</h3>
                        <p>{props.option.description}</p>
                    </div>
                </div>
            </button>
            {isHovering && <div className={styles.buttonHoverShadow} />}
        </div>
    );
};

interface Props {
    options: AvailableModel[] | undefined;
    onSelect: (selectedValue: AvailableModel) => void;
}

const Options: React.FC<Props> = (props) => {
    return props.options?.map((option, index) => (
        <div key={index}>
            <Option onClick={props.onSelect} option={option} />
            <div className={commonStyles.space2} />
        </div>
    ));
};

export default Options;
