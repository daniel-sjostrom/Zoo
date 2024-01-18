import { create } from "zustand";
import { AxiosError } from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

const THE_END =
    "6f147e8ca3d5eeb01779c95b463fd1a8452a73419f8060af84eda9781be51d0c";

type eventSourceData = {
    response: string[];
};

interface State {
    eventSourceData: eventSourceData;
    isLoading: boolean;
    error: string | null;
    close?: () => void;
    eventSource: ({
        aiID,
        prompt,
        userID,
    }: {
        aiID: string;
        prompt: string;
        userID: string;
    }) => Promise<void>;
}

const useChat = create<State>((set) => ({
    eventSourceData: { response: [] },
    isLoading: false,
    error: null,
    eventSource: async ({ aiID, prompt, userID }) => {
        set({ isLoading: true, error: null });
        console.log(aiID, prompt, userID);
        try {
            await fetchEventSource(`${process.env.NEXT_PUBLIC_API}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    user_id: userID,
                },
                body: JSON.stringify({
                    ai_id: aiID,
                    prompt: prompt,
                }),
                onmessage(event) {
                    set((state) => ({
                        eventSourceData: {
                            response: [
                                ...state.eventSourceData.response,
                                event.data,
                            ],
                        },
                        isLoading: false,
                    }));
                },
            });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useChat;
