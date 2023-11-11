import { create } from "zustand";
import axios, { AxiosError } from "axios";

type data = {
    question_id: string;
};

interface PostStoreState {
    data: data | undefined;
    isLoading: boolean;
    error: string | null;
    getQuestionID: () => Promise<void>;
}

const useQuestionStore = create<PostStoreState>((set) => ({
    data: undefined,
    isLoading: false,
    error: null,
    getQuestionID: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API}/new-question`
            );

            set({ data: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useQuestionStore;
