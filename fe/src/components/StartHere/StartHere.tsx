"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { copy } from "@/copy/en";
import useQuestionStore from "@/stores/useQuestionStore";

import Button from "../Button";

const StartHere = () => {
    const router = useRouter();
    const getQuestionID = useQuestionStore((state) => state.getQuestionID);
    const data = useQuestionStore((state) => state.data);

    const onClick = async () => {
        await getQuestionID();
    };

    // Navigate after we have the question ID
    useEffect(() => {
        if (data !== undefined) {
            router.push(`/question/${data.question_id}`);
        }
    }, [data, router]);

    return <Button onClick={onClick}>{copy.home_start_here_button}</Button>;
};

export default StartHere;
