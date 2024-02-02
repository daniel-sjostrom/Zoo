import { create } from "zustand";
import axios, { AxiosError } from "axios";

type postData = {
    prompt: string;
    response: string;
};

interface State {
    isLoading: boolean;
    error: string | null;
    postData: postData[];
    post: (arg: {
        ai_id: string;
        prompt: string;
        response: string;
        user_id: string;
    }) => Promise<void>;
}

const useAISettings = create<State>((set) => ({
    getData: undefined,
    postData: [],
    isLoading: false,
    error: null,
    post: async (arg) => {
        set({ isLoading: true, error: null });
        // TODO Send one message at a time.
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/chat-history`,
                {
                    headers: {
                        user_id: arg.user_id,
                    },
                    params: {
                        ai_id: arg.ai_id,
                        prompt: arg.ai_id,
                        response: arg.ai_id,
                    },
                }
            );

            set({ postData: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useAISettings;
