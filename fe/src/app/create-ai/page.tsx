"use client";

import { useEffect } from "react";
import Box from "@/components/Box";
import Button from "@/components/Button";
import commonStyles from "@/styles/common.module.css";
import { copy } from "@/copy/en";

import styles from "./page.module.css";
import Input from "./components/Input";
import useAIStore from "../stores/useAIStore";

const CreateAIPage = () => {
    const getAIStore = useAIStore((state) => state.getAIStore);
    const AIStoreData = useAIStore((state) => state.data);

    useEffect(() => {
        getAIStore();
    }, [getAIStore]);

    return (
        <main className={styles.main}>
            <Box>
                <h2>{copy.create_ai_form_title}</h2>
                <div className={commonStyles.space4} />
                <Input defaultText={AIStoreData?.name_suggestion} />
                <p>{AIStoreData?.available_models}</p>
                <Button onClick={() => {}}>
                    {copy.create_ai_form_next_button}
                </Button>
            </Box>
        </main>
    );
};

export default CreateAIPage;
