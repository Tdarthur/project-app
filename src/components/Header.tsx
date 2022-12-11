import classNames from "classnames";

type Props = {
    pageName: string;
    error?: boolean;
};

export default function Header({ pageName, error = false }: Props) {
    return (
        <div className="fixed top-0 left-0 h-20 w-full px-60">
            <div className="mx-auto flex h-full items-center justify-center border-b-2 border-b-zinc-800 backdrop-blur-md">
                <h1 className={classNames("text-4xl font-bold", !error ? "text-white" : "text-red-500")}>{pageName}</h1>
            </div>
        </div>
    );
}
