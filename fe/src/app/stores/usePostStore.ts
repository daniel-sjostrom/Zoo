import { create } from "zustand";
import axios, { AxiosError } from "axios";

interface PostStoreState {
    data: any | null;
    isLoading: boolean;
    error: string | null;
    post: (arg: string) => Promise<void>;
}

const usePostStore = create<PostStoreState>((set) => ({
    data: null,
    isLoading: false,
    error: null,

    post: async (data) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/post`,
                {
                    username: data,
                }
            );
            set({ data: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default usePostStore;
