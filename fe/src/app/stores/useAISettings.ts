import { create } from "zustand";
import axios, { AxiosError } from "axios";

type postData = {
    user_id: string;
    ai_id: string;
};

type getData = {
    user_id: string;
    ai_id: string;
    name: string;
    model: string;
};

interface State {
    isLoading: boolean;
    error: string | null;
    getData: getData | undefined;
    postData: postData | undefined;
    get: () => Promise<void>;
    post: (arg: {
        name: string;
        model: string;
        user_id?: string;
    }) => Promise<void>;
}

const useAISettings = create<State>((set) => ({
    getData: undefined,
    postData: undefined,
    isLoading: false,
    error: null,

    get: async () => {
        set({ isLoading: true, error: null });

        try {
            // TODO add user_id in the header and ai_id as a query parameter
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/ai-settings`
            );

            set({ getData: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
    post: async (data) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/ai-settings`,
                {
                    name: data.name,
                    model: data.model,
                    user_id: data?.user_id,
                }
            );

            set({ postData: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useAISettings;
