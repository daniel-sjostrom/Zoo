import { create } from "zustand";
import { AxiosError } from "axios";
import { fetchEventSource } from "@microsoft/fetch-event-source";

export type ChatHistory = { response: string; prompt: string };
type eventSourceData = {
    streamingResponse: string[];
    chatHistory: ChatHistory[];
};

interface State {
    eventSourceData: eventSourceData;
    isLoading: boolean;
    error: string | null;
    close?: () => void;
    eventSource: ({
        ai_id,
        prompt,
        user_id,
    }: {
        ai_id: string;
        prompt: string;
        user_id: string;
    }) => Promise<void>;
}

const updateLastObject = (
    list: ChatHistory[],
    response: string
): ChatHistory[] => {
    return list.map((item, i) => {
        if (i === list.length - 1) {
            return { ...item, response };
        }
        return item;
    });
};

const useChat = create<State>((set) => ({
    eventSourceData: { streamingResponse: [], chatHistory: [] },
    isLoading: false,
    error: null,
    eventSource: async (arg) => {
        set({ isLoading: true, error: null });
        try {
            await fetchEventSource(`${process.env.NEXT_PUBLIC_API}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    user_id: arg.user_id,
                },
                body: JSON.stringify({
                    ai_id: arg.ai_id,
                    prompt: arg.prompt,
                }),
                // Set the prompt when the stream opens
                async onopen() {
                    set((state) => ({
                        eventSourceData: {
                            streamingResponse: [],
                            chatHistory: [
                                ...state.eventSourceData.chatHistory,
                                { response: "", prompt: arg.prompt },
                            ],
                        },
                        isLoading: false,
                    }));
                },
                // Set the response in the streaming array when the stream is streaming
                onmessage(event) {
                    set((state) => ({
                        eventSourceData: {
                            streamingResponse: [
                                ...state.eventSourceData.streamingResponse,
                                event.data,
                            ],
                            chatHistory: [...state.eventSourceData.chatHistory],
                        },
                        isLoading: false,
                    }));
                },
                // Set the response in the historical array when the stream has closed
                onclose() {
                    set((state) => ({
                        eventSourceData: {
                            streamingResponse: [],
                            chatHistory: updateLastObject(
                                state.eventSourceData.chatHistory,
                                state.eventSourceData.streamingResponse.join("")
                            ),
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
