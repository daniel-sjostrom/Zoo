"use client";

import Button from "@/components/Button";
import useQuestionStore from "@/stores/useQuestionStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";

function DynamicLinkPage() {
    const { id } = useParams();
    const questionData = useQuestionStore((state) => state.data);

    return (
        <div>
            <h1>Dynamic Link Page</h1>
            <p>Router ID: {id}</p>
            <p>Question ID: {questionData?.question_id}</p>
        </div>
    );
}

export default DynamicLinkPage;
