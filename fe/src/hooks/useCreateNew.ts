import useIDs from "@/app/stores/useIDs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useCreateNew = (): (() => void) => {
    const router = useRouter();
    const getIDs = useIDs((state) => state.get);
    const IDsGetData = useIDs((state) => state.getData);

    const handleCreate = () => {
        getIDs();
    };

    useEffect(() => {
        if (IDsGetData.llm_id) {
            router.push(`/chat/${IDsGetData.llm_id}`);
        }
    }, [IDsGetData.llm_id, router]);

    return handleCreate;
};

export default useCreateNew;
