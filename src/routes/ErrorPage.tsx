import { Link } from "react-router-dom";

export default function ErrorPage() {
    return (
        <h2 className="w-full text-center text-2xl font-bold text-red-300">
            Please return to the{" "}
            <Link
                to="/"
                className="text-red-500 underline transition-colors hover:text-white"
            >
                home page
            </Link>
            .
        </h2>
    );
}
