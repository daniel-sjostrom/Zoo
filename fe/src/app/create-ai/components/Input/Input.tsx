"use client";

import React, { useState, ChangeEvent, useEffect, useRef } from "react";

import styles from "./Input.module.css";

interface Props {
    defaultText?: string;
    onInput: (arg: string) => void;
}

const Input: React.FC<Props> = (props) => {
    const [input, setInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setInput(props.defaultText ?? "");
    }, [props.defaultText]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
        props.onInput(e.target.value);
    };

    return (
        <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={input}
            onChange={handleInputChange}
        />
    );
};

export default Input;
