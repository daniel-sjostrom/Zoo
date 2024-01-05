"use client";

import Box from "@/components/Box";
import Button from "@/components/Button";
import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

import styles from "./page.module.css";
import Input from "./components/Input";

const CreateAIPage = () => {
    return (
        <main className={styles.main}>
            <Box>
                <h2>{copy.create_ai_form_title}</h2>
                <div className={commonStyles.space4} />
                <div className={styles.buttonContainer}>
                    <Input />
                    <div className={commonStyles.space_horizontal4} />
                    <Button onClick={() => {}}>
                        {copy.create_ai_form_next_button}
                    </Button>
                </div>
            </Box>
        </main>
    );
};

export default CreateAIPage;
