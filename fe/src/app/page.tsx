"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import { Vertical4 } from "@/components/HorizontalVertical/Vertical";

import styles from "./page.module.css";

const Home = () => {
    const router = useRouter();

    // Define the click handler function
    const handleClick = () => {
        router.push("/chat"); // Use the push method to navigate
    };

    return (
        <main className={styles.main}>
            <h1>🦁 Zoo 🦁</h1>
            <Vertical4 />
            <Button text={"Hello World"} onClick={handleClick} />
        </main>
    );
};

export default Home;
