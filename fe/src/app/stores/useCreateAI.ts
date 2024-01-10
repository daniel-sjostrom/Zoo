import { create } from "zustand";
import axios, { AxiosError } from "axios";

type data = {
    postAiSettings: {
        user_id: string;
        ai_id: string;
    };
    getAiSettings: {
        user_id: string;
        ai_id: string;
        name: string;
        model: string;
    };
};

interface State {
    data: data | undefined;
    isLoading: boolean;
    error: string | null;
    post: (arg: {
        name: string;
        model: string;
        user_id?: string;
    }) => Promise<void>;
}

const useCreateAI = create<State>((set) => ({
    data: undefined,
    isLoading: false,
    error: null,

    post: async (data) => {
        set({ isLoading: true, error: null });

        try {
            console.log(data);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/ai-settings`,
                {
                    name: data.name,
                    model: data.model,
                    user_id: data?.user_id,
                }
            );
            console.log("am I here??");
            console.log(response);
            set({ data: response.data, isLoading: false });
        } catch (error: AxiosError | any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useCreateAI;
