"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Box from "@/components/Box";
import Button from "@/components/Button";
import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

import styles from "./page.module.css";
import Input from "./components/Input";
import Options from "./components/Options";
import useAIStore, { AvailableModel } from "../stores/useAIStore";

const CreateAIPage = () => {
    const router = useRouter();
    const getAIStore = useAIStore((state) => state.getAIStore);
    const AIStoreData = useAIStore((state) => state.data);
    const [progress, setProgress] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<AvailableModel | null>(
        null
    );

    useEffect(() => {
        getAIStore();
    }, [getAIStore]);

    const onSelectedModel = (arg: AvailableModel) => {
        setTimeout(() => {
            setSelectedOption(arg);
            setProgress(progress + 1);
        }, 500);
    };

    const onNext = () => {
        router.push("/inference");
    };

    return (
        <main className={styles.main}>
            <Box>
                <div>
                    <h2 className={`${progress > 0 && styles.modelIsSelected}`}>
                        {copy.create_ai_form_select_model}
                    </h2>
                    <div className={commonStyles.space2} />
                    <Options
                        options={
                            selectedOption === null
                                ? AIStoreData?.available_models
                                : [selectedOption]
                        }
                        onClick={onSelectedModel}
                    />
                </div>
                {progress > 0 && (
                    <>
                        <div className={commonStyles.space4} />
                        <h2>{copy.create_ai_form_name}</h2>
                        <div className={commonStyles.space2} />
                        <form className={styles.form}>
                            <Input defaultText={AIStoreData?.name_suggestion} />
                            <div className={commonStyles.space_horizontal4} />
                            <Button onClick={onNext}>
                                {copy.create_ai_form_next_button}
                            </Button>
                        </form>
                    </>
                )}
            </Box>
        </main>
    );
};

export default CreateAIPage;
