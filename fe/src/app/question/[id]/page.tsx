"use client";

import useQuestionStore from "@/app/stores/useQuestionStore";
import { useParams } from "next/navigation";

import Box from "./components/Box";
import styles from "./page.module.css";

function QuestionForm() {
    const { id } = useParams();
    const questionData = useQuestionStore((state) => state.data);

    return (
        <div className={styles.main}>
            <Box />
        </div>
    );
}

export default QuestionForm;
