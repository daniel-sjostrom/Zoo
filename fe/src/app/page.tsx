import PostButton from "./components/PostButton";
import styles from "./page.module.css";

const Home = () => {
    return (
        <main className={styles.main}>
            <PostButton />
        </main>
    );
};

export default Home;
