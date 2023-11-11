"use client";

import useQuestionStore from "@/app/stores/useQuestionStore";
import { useParams } from "next/navigation";

import Box from "./components/Box";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { copy } from "@/copy/en";

function QuestionForm() {
    const { id } = useParams();
    const questionData = useQuestionStore((state) => state.data);

    return (
        <div className={styles.main}>
            <Box />
            <div className={styles.space4} />
            <div className={styles.addButtonContainer}>
                <Button secondaryButton onClick={() => {}}>
                    {copy.question_form_add_button}
                </Button>
            </div>
        </div>
    );
}

export default QuestionForm;
