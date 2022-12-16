import { useEffect, useState } from "react";
import { DocumentDuplicateIcon as OutlineCopyIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon as SolidCopyIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import classNames from "classnames";
import Prism from "prismjs";

type Props = {
    children: string;
    title: string;
    language: string;
};

const CODE_BLOCK_BACKGROUND_COLOR = "rgb(31 41 55)";

export default function Codeblock({ children, title, language }: Props) {
    const [copyHovered, setCopyHovered] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    const hoverCopy = () => {
        setCopyHovered(true);
    };

    const leaveCopy = () => {
        setCopyHovered(false);
    };

    const copyCode = () => {
        navigator.clipboard.writeText(children);

        toast.remove();
        toast.success("Copied to clipboard");
    };

    return (
        <div className="relative">
            <span
                className={classNames("absolute right-2 block h-6 w-6 cursor-pointer", !title ? "top-2" : "top-10")}
                onClick={copyCode}
                onPointerEnter={hoverCopy}
                onPointerLeave={leaveCopy}
                tabIndex={0}
            >
                <SolidCopyIcon className={classNames("w-full", { hidden: !copyHovered })} />
                <OutlineCopyIcon className={classNames("w-full", { hidden: copyHovered })} />
            </span>

            {!!title && <h2 className="w-fit rounded-t-sm bg-gray-800 px-4 pt-2 font-bold text-gray-400">{title}</h2>}

            <pre style={{ marginTop: 0, marginBottom: 0, backgroundColor: CODE_BLOCK_BACKGROUND_COLOR }}>
                <code
                    className={`language-${language}`}
                    style={{ backgroundColor: CODE_BLOCK_BACKGROUND_COLOR }}
                >
                    {children}
                </code>
            </pre>
        </div>
    );
}
