import { create } from "zustand";
import axios, { AxiosError } from "axios";

export type AvailableModel = {
    name: string;
    description: string;
    file_name: string;
};

type data = {
    name_suggestion: string;
    available_models: AvailableModel[];
};

interface State {
    data: data | undefined;
    isLoading: boolean;
    error: string | null;
    getAIStore: () => Promise<void>;
}

const useAIStore = create<State>((set) => ({
    data: undefined,
    isLoading: false,
    error: null,
    getAIStore: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/ai-store`
            );

            set({ data: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useAIStore;
