"use client";

import React, { useState, ChangeEvent } from "react";
import styles from "./Question.module.css";
import { copy } from "@/app/copy/en";

const Question: React.FC = () => {
    const [input, setInput] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    return (
        <form className={styles.container}>
            <input
                className={styles.input}
                type="text"
                placeholder={copy.question_form_write_question}
                value={input}
                onChange={handleInputChange}
            />
        </form>
    );
};

export default Question;
