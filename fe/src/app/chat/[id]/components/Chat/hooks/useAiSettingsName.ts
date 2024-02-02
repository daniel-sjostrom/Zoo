import { useParams } from "next/navigation";
import { useEffect } from "react";

import useAISettings from "@/app/stores/useAISettings";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";

const useAiSettingsName = () => {
    const params = useParams();
    const [userID] = useLocalStorage<string>(LocalStorageKey.UserID);
    const getAiSettings = useAISettings((state) => state.get);
    const aiSettingsData = useAISettings((state) => state.getData);

    useEffect(() => {
        if (aiSettingsData === undefined) {
            getAiSettings({ user_id: userID, ai_id: params.id as string });
        }
    }, [aiSettingsData, getAiSettings, params.id, userID]);

    return aiSettingsData?.name;
};

export default useAiSettingsName;
