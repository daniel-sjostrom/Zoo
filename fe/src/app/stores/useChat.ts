import { create } from "zustand";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";

type getData = {
    words: string[];
};

interface State {
    getData: getData;
    isLoading: boolean;
    error: string | null;
    get: () => Promise<(() => void) | undefined>;
}

const useChat = create<State>((set) => ({
    getData: { words: [] },
    isLoading: false,
    error: null,
    get: async () => {
        set({ isLoading: true, error: null });

        try {
            const eventSource = new EventSource(
                `${process.env.NEXT_PUBLIC_API}/chat-stream`
            );

            eventSource.onmessage = (event) => {
                // TODO Make this solution more reliable
                if (event.data === "the: end") {
                    console.log("closed");
                    eventSource.close();
                    return;
                }
                if (eventSource.readyState === eventSource.OPEN) {
                    set((state) => ({
                        getData: {
                            words: [...state.getData.words, event.data],
                        },
                        isLoading: false,
                    }));
                }
            };

            // Close the EventSource connection on component unmount
            return () => {
                eventSource.close;
            };
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useChat;
