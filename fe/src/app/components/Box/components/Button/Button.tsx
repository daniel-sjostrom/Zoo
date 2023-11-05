"use client";

import React from "react";
import styles from "./Button.module.css";
import { copy } from "@/app/copy/en";

const Button: React.FC = () => {
    return (
        <button className={styles.button}>
            {copy.question_form_next_button}
        </button>
    );
};

export default Button;
