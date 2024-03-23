"use client";

import { useEffect } from "react";

import Button from "@/components/Button";
import { Vertical4 } from "@/components/HorizontalVertical/Vertical";
import useLocalStorage, { LocalStorageKey } from "@/hooks/useLocalStorage";
import { copy } from "@/copy/en";
import useCreateNew from "@/hooks/useCreateNew";

import styles from "./page.module.css";
import useIDs from "./stores/useIDs";

const Home = () => {
    const IDsGetData = useIDs((state) => state.getData);
    const [_, setUserID] = useLocalStorage(LocalStorageKey.UserID, "");
    const createNew = useCreateNew();

    useEffect(() => {
        if (IDsGetData.user_id) {
            setUserID(IDsGetData.user_id);
        }
    }, [IDsGetData.user_id, setUserID]);

    return (
        <main className={styles.main}>
            <h1>🦁 Zoo 🦁</h1>
            <Vertical4 />
            <Button text={copy.home_start_here_button} onClick={createNew} />
        </main>
    );
};

export default Home;
