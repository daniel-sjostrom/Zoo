import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AvailableModel } from "@/app/stores/useAIStore";
import useCreateAI from "@/app/stores/useCreateAI";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";

const useOnCreateAI = (
    name: string | undefined,
    model: AvailableModel | undefined
) => {
    const router = useRouter();
    const [_, setUserID] = useLocalStorage(LocalStorageKey.UserID);
    const createAIResponse = useCreateAI((state) => state.data);
    const postCreateAI = useCreateAI((state) => state.post);

    useEffect(() => {
        if (createAIResponse) {
            setUserID(createAIResponse?.user_id);
            router.push(`/chat/${createAIResponse?.ai_id}`);
        }
    }, [createAIResponse, router, setUserID]);

    const onCreateAI = async () => {
        if (name && model) {
            await postCreateAI({ name, model: model.file_name });
        }
    };

    return onCreateAI;
};

export default useOnCreateAI;
