import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Zoo",
    description: "The Zoo App",
};

interface Props {
    children: React.ReactNode;
}

const RootLayout: React.FC<Props> = (props) => {
    return (
        <html lang="en">
            <body className={inter.className}>{props.children}</body>
        </html>
    );
};

export default RootLayout;
