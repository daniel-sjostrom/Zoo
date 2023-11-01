"use client";

import usePostStore from "@/stores/usePostStore";
import styles from "./PostButton.module.css";

const PostButton = () => {
    const { data, post, isLoading, error } = usePostStore();

    const postData = () => {
        post("hello from the frontend5");
    };

    return (
        <div>
            <button className={styles.button} onClick={postData}>
                <p className={styles.buttonText}>Post</p>
            </button>
            <p>{data?.message}</p>
            <p>{isLoading}</p>
            <p>{error}</p>
        </div>
    );
};

export default PostButton;
