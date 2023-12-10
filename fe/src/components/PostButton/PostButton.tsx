"use client";

import styles from "./PostButton.module.css";

const PostButton = () => {
    return (
        <div>
            <button className={styles.button}>
                <p className={styles.buttonText}>Post</p>
            </button>
        </div>
    );
};

export default PostButton;
