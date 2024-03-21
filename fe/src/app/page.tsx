import Pill from "@/components/Pill";
import styles from "./page.module.css";

const Home = () => {
    return (
        <main className={styles.main}>
            {/* TODO rearrange all the colors */}
            {/* TODO build the components and the system */}
            {/* TODO Create a new main page for Zoo */}
            <h1>🦁 Zoo 🦁</h1>
            <Pill text={"Hello World"} />
        </main>
    );
};

export default Home;
