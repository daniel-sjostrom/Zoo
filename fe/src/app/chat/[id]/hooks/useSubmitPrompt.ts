import { useParams } from "next/navigation";

import useChat from "@/app/stores/useChat";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";

const useSubmitPrompt = (
    inputText: string,
    setInputText: (arg: string) => void
): ((e: React.FormEvent) => Promise<void>) => {
    const params = useParams();
    const [userID] = useLocalStorage<string>(LocalStorageKey.UserID);
    const chatEventSource = useChat((state) => state.eventSource);
    // TODO Get chat working with the new ollama. Maybe it already works?
    return async (e: React.FormEvent) => {
        e.preventDefault();
        setInputText("");
        await chatEventSource({
            user_id: userID,
            ai_id: params.id as string,
            prompt: inputText,
        });
    };
};

export default useSubmitPrompt;
