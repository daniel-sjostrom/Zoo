"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { copy } from "@/copy/en";
import useQuestionStore from "@/app/stores/useQuestionStore";
import Button from "@/components/Button";
import ButtonDisabled from "@/components/ButtonDisabled";

const StartHere = () => {
    const router = useRouter();
    const getQuestionID = useQuestionStore((state) => state.getQuestionID);
    const questionData = useQuestionStore((state) => state.data);
    const isNavigating = useRef(false);

    const onClick = async () => {
        isNavigating.current = true;
        await getQuestionID();
    };

    // Navigate after question ID fetch
    useEffect(() => {
        if (questionData !== undefined) {
            router.push(`/question/${questionData.question_id}`);
        }
    }, [questionData, router]);

    if (isNavigating.current === true) {
        return <ButtonDisabled>{copy.home_start_here_button}</ButtonDisabled>;
    }

    return <Button onClick={onClick}>{copy.home_start_here_button}</Button>;
};

export default StartHere;
