import { create } from "zustand";
import axios, { AxiosError } from "axios";

type data = {
    user_id: string;
    ai_id: string;
};

interface State {
    data: data | undefined;
    isLoading: boolean;
    error: string | null;
    get: (arg: {
        name: string;
        model: string;
        user_id?: string;
    }) => Promise<void>;
}

const useAISettings = create<State>((set) => ({
    data: undefined,
    isLoading: false,
    error: null,

    get: async (data) => {
        set({ isLoading: true, error: null });

        try {
            // TODO add user_id in the header and ai_id as a query parameter
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/ai-settings`
            );

            set({ data: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useAISettings;
