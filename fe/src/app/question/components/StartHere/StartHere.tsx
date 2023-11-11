"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { copy } from "@/copy/en";
import useQuestionStore from "@/app/stores/useQuestionStore";
import Button from "@/components/Button";

const StartHere = () => {
    const router = useRouter();
    const getQuestionID = useQuestionStore((state) => state.getQuestionID);
    const questionData = useQuestionStore((state) => state.data);

    const onClick = async () => {
        await getQuestionID().then(() => {});
    };

    // Navigate after question ID fetch
    useEffect(() => {
        if (questionData !== undefined) {
            router.push(`/question/${questionData.question_id}`);
        }
    }, [questionData, router]);

    return <Button onClick={onClick}>{copy.home_start_here_button}</Button>;
};

export default StartHere;
