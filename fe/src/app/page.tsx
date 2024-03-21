"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import { Vertical4 } from "@/components/HorizontalVertical/Vertical";

import styles from "./page.module.css";
import useGenerateIds from "./stores/useGenerateIds";
import { useEffect } from "react";

const Home = () => {
    const router = useRouter();
    const { get, getData } = useGenerateIds();

    const handleClick = () => {
        get();
        router.push("/chat");
    };

    useEffect(() => {
        console.log(getData);
    }, [getData]);

    return (
        <main className={styles.main}>
            <h1>🦁 Zoo 🦁</h1>
            <Vertical4 />
            <Button text={"Hello World"} onClick={handleClick} />
        </main>
    );
};

export default Home;
