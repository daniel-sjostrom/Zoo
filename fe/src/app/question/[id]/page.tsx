"use client";

import useQuestionStore from "@/app/stores/useQuestionStore";
import commonStyles from "@/styles/common.module.css";
import Button from "@/components/Button";
import { copy } from "@/copy/en";
import Box from "@/components/Box";
import { useParams } from "next/navigation";

import styles from "./page.module.css";
import Question from "./components/Question";

const QuestionForm = () => {
    const { id } = useParams();
    const questionData = useQuestionStore((state) => state.data);

    return (
        <div className={styles.main}>
            <Box>
                <h2>{copy.question_form_title}</h2>
                <div className={commonStyles.space4} />
                <div className={styles.buttonContainer}>
                    <Question />
                    <div className={commonStyles.space_horizontal4} />
                    <Button onClick={() => {}}>
                        {copy.question_form_next_button}
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default QuestionForm;
