"use client";

import { useEffect, useState } from "react";

import Box from "@/components/Box";
import Button from "@/components/Button";
import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

import styles from "./page.module.css";
import Input from "./components/Input";
import Options from "./components/Options";
import useOnCreateAI from "./hooks/useOnCreateAI";

import useAIStore, { AvailableModel } from "../stores/useAIStore";

const CreateAI = () => {
    const getAIStore = useAIStore((state) => state.getAIStore);
    const AIStoreResponse = useAIStore((state) => state.data);
    const [model, setModel] = useState<AvailableModel | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const onCreateAI = useOnCreateAI(name, model);

    useEffect(() => {
        getAIStore();
    }, [getAIStore]);

    useEffect(() => {
        setName(AIStoreResponse?.name_suggestion);
    }, [AIStoreResponse?.name_suggestion]);

    return (
        <main className={styles.main}>
            <Box>
                <div>
                    <h2>{copy.create_ai_form_select_model}</h2>
                    <div className={commonStyles.space2} />
                    <Options
                        options={AIStoreResponse?.available_models}
                        onSelect={setModel}
                    />
                </div>
                <div className={commonStyles.space6} />
                <h2>{copy.create_ai_form_name}</h2>
                <div className={commonStyles.space2} />
                <Input
                    defaultText={AIStoreResponse?.name_suggestion}
                    onInput={setName}
                />
                <div className={commonStyles.space6} />
                <Button disabled={!model || !name} onClick={onCreateAI}>
                    {copy.create_ai_form_next_button}
                </Button>
            </Box>
        </main>
    );
};

export default CreateAI;
