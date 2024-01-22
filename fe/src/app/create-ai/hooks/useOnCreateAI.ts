import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AvailableModel } from "@/app/stores/useAIStore";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import useAISettings from "@/app/stores/useAISettings";

const useOnCreateAI = (
    name: string | undefined,
    model: AvailableModel | undefined
) => {
    const router = useRouter();
    const [_, setUserID] = useLocalStorage(LocalStorageKey.UserID);
    const postData = useAISettings((state) => state.postData);
    const postAISettings = useAISettings((state) => state.post);

    useEffect(() => {
        if (postData) {
            setUserID(postData.user_id);
            router.push(`/chat/${postData?.ai_id}`);
        }
    }, [postData, router, setUserID]);

    const onCreateAI = async () => {
        if (name && model) {
            await postAISettings({ name, model: model.file_name });
        }
    };

    return onCreateAI;
};

export default useOnCreateAI;
