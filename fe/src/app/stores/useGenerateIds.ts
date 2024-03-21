import axios from "axios";
import { create } from "zustand";

type getData = {
    user_id: string;
    llm_id: string;
};

interface State {
    getData: getData;
    isLoading: boolean;
    error: string | null;
    get: () => Promise<void>;
}

const useGenerateIds = create<State>((set) => ({
    getData: { user_id: "", llm_id: "" },
    isLoading: false,
    error: null,
    get: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/generate-ids`
            );

            const { user_id, llm_id } = response.data;

            set({ getData: { user_id, llm_id }, isLoading: false });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ error: error.message, isLoading: false });
            } else {
                console.error("An unexpected error occurred:", error);
                set({
                    error: "An unexpected error occurred",
                    isLoading: false,
                });
            }
        }
    },
}));

export default useGenerateIds;
