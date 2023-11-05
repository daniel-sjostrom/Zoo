import { useRouter } from "next/router";

function DynamicLinkPage() {
    const router = useRouter();
    const { question } = router.query;

    return (
        <div>
            <h1>Dynamic Link Page</h1>
            <p>Dynamic content for ID: {question}</p>
        </div>
    );
}

export default DynamicLinkPage;
