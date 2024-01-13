import { create } from "zustand";
import axios, { AxiosError } from "axios";

export type AvailableModel = {
    name: string;
    description: string;
    file_name: string;
};

type getData = {
    name_suggestion: string;
    available_models: AvailableModel[];
};

interface State {
    getData: getData | undefined;
    isLoading: boolean;
    error: string | null;
    get: () => Promise<void>;
}

const useAIStore = create<State>((set) => ({
    getData: undefined,
    isLoading: false,
    error: null,
    get: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/ai-store`
            );

            set({ getData: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useAIStore;
