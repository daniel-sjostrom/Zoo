"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@/components/Box";
import Button from "@/components/Button";
import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

import styles from "./page.module.css";
import Input from "./components/Input";
import Options from "./components/Options";
import useAIStore, { AvailableModel } from "../stores/useAIStore";
import useCreateAI from "../stores/useCreateAI";

const CreateAIPage = () => {
    const router = useRouter();
    const getAIStore = useAIStore((state) => state.getAIStore);
    const AIStoreData = useAIStore((state) => state.data);
    const postCreateAI = useCreateAI((state) => state.post);
    const [model, setModel] = useState<AvailableModel | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);

    useEffect(() => {
        getAIStore();
    }, [getAIStore]);

    useEffect(() => {
        setName(AIStoreData?.name_suggestion);
    }, [AIStoreData?.name_suggestion]);

    const onNameChange = (arg: string) => {
        setName(arg);
    };

    const onNext = () => {
        if (name && model) {
            // TODO add routing to chat or similar url /chat/{ai_id}
            // TODO save the user id to the client
            postCreateAI({ name, model: model.file_name });
        }
    };

    return (
        <main className={styles.main}>
            <Box>
                <div>
                    <h2>{copy.create_ai_form_select_model}</h2>
                    <div className={commonStyles.space2} />
                    <Options
                        options={AIStoreData?.available_models}
                        onSelect={setModel}
                    />
                </div>
                <div className={commonStyles.space6} />
                <h2>{copy.create_ai_form_name}</h2>
                <div className={commonStyles.space2} />
                <Input
                    defaultText={AIStoreData?.name_suggestion}
                    onInput={onNameChange}
                />
                <div className={commonStyles.space6} />
                <Button disabled={!model || !name} onClick={onNext}>
                    {copy.create_ai_form_next_button}
                </Button>
            </Box>
        </main>
    );
};

export default CreateAIPage;
