"use client";

import { useRouter } from "next/navigation";
import { copy } from "@/copy/en";

import Button from "../Button";

const StartHere = () => {
    const router = useRouter();

    const generateAndNavigate = async () => {
        const uniqueID = Math.random().toString(36).substr(2, 6);

        router.push(`/question/${uniqueID}`);
    };

    return (
        <Button onClick={generateAndNavigate}>
            {copy.home_start_here_button}
        </Button>
    );
};

export default StartHere;
