"use client";

import React from "react";
import commonStyles from "@/styles/common.module.css";
import { AvailableModel } from "@/app/stores/useAIStore";

import Option from "./components/Option";

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
