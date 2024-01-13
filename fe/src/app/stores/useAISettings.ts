import { create } from "zustand";
import axios, { AxiosError } from "axios";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";

type postData = {
    user_id: string;
    ai_id: string;
};

type getData = {
    ai_id: string;
    user_id: string;
    name: string;
    model: string;
};

interface State {
    isLoading: boolean;
    error: string | null;
    getData: getData | undefined;
    postData: postData | undefined;
    get: (arg: { user_id: string; ai_id: string }) => Promise<void>;
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

    get: async (arg) => {
        set({ isLoading: true, error: null });
        console.log(arg.user_id);
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/ai-settings`,
                {
                    headers: {
                        user_id: arg.user_id,
                    },
                    params: {
                        ai_id: arg.ai_id,
                    },
                }
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
