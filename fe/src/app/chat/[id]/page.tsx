"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.css";

const Chat: React.FC = () => {
    const params = useParams();
    return (
        <main className={styles.main}>
            <h2>Chat 🤖</h2>
            <h2>{params.id}</h2>
        </main>
    );
};

export default Chat;
