import { create } from "zustand";
import { AxiosError } from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

type eventSourceData = {
    streamingResponse: string[];
    fullResponse: string;
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
    eventSourceData: { streamingResponse: [], fullResponse: "" },
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
                // Set the streaming response one char at a time
                onmessage(event) {
                    set((state) => ({
                        eventSourceData: {
                            streamingResponse: [
                                ...state.eventSourceData.streamingResponse,
                                event.data,
                            ],
                            fullResponse: "",
                        },
                        isLoading: false,
                    }));
                },
                // Set the full response after the stream has closed
                onclose() {
                    set((state) => ({
                        eventSourceData: {
                            fullResponse:
                                state.eventSourceData.streamingResponse.join(
                                    ""
                                ),
                            streamingResponse: [],
                        },
                    }));
                },
            });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useChat;
