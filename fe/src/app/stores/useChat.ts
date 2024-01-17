import { create } from "zustand";
import { AxiosError } from "axios";

const THE_END =
    "6f147e8ca3d5eeb01779c95b463fd1a8452a73419f8060af84eda9781be51d0c";

type getData = {
    words: string[];
};

interface State {
    getData: getData;
    isLoading: boolean;
    error: string | null;
    close?: () => void;
    get: () => Promise<void>;
}

const useChat = create<State>((set) => ({
    getData: { words: [] },
    isLoading: false,
    error: null,
    get: async () => {
        set({ isLoading: true, error: null });

        try {
            // TODO Refactor so that ai_id and user_id is sent in the request
            const eventSource = new EventSource(
                `${process.env.NEXT_PUBLIC_API}/chat-stream`
            );

            eventSource.onmessage = (event) => {
                if (event.data === THE_END) {
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
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useChat;
