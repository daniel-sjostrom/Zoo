"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";

import styles from "./Input.module.css";

interface Props {
    value: string | undefined;
    placeholder?: string;
    onChange: (arg: string) => void;
}

const Input: React.FC<Props> = (props) => {
    const [_, setInput] = useState<string>("");
    const [isFocused, setOnFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setInput(props.placeholder ?? "");
    }, [props.placeholder]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        props.onChange(e.target.value);
    };

    const handleOnFocus = () => {
        setOnFocus(true);
    };

    const handleOnBlur = () => {
        setOnFocus(false);
    };

    return (
        <input
            ref={inputRef}
            className={`${styles.input} ${isFocused ? styles.focused : ""}`}
            type="text"
            value={props.value}
            onChange={handleInputChange}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
        />
    );
};

export default Input;
