"use client";

import { useEffect, useState } from "react";
import Box from "@/components/Box";
import Button from "@/components/Button";
import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

import styles from "./page.module.css";
import Input from "./components/Input";
import Options from "./components/Options";
import useAIStore from "../stores/useAIStore";

const CreateAIPage = () => {
    const getAIStore = useAIStore((state) => state.getAIStore);
    const AIStoreData = useAIStore((state) => state.data);
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        getAIStore();
    }, [getAIStore]);

    const onNext = () => {
        setProgress(progress + 1);
    };

    return (
        <main className={styles.main}>
            <Box>
                {progress === 0 && (
                    <div>
                        <h2>{"Select your AI model"}</h2>
                        <div className={commonStyles.space2} />
                        <Options
                            options={AIStoreData?.available_models}
                            onSelect={() => {}}
                        />
                    </div>
                )}
                {progress === 1 && (
                    <div>
                        <h2>{"Name your AI"}</h2>
                        <div className={commonStyles.space2} />
                        <form className={styles.form}>
                            <Input defaultText={AIStoreData?.name_suggestion} />
                            <div className={commonStyles.space_horizontal4} />
                            <Button onClick={onNext}>
                                {copy.create_ai_form_next_button}
                            </Button>
                        </form>
                    </div>
                )}
            </Box>
        </main>
    );
};

export default CreateAIPage;
