import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export type NavigationEntry = {
    href: string;
    img: React.ReactElement;
    text: string;
};

type Props = {
    navigation: NavigationEntry[];
};

export default function NavigationList({ navigation }: Props) {
    const location = useLocation();

    // somehow position this on the left as a list
    return (
        <div className="fixed">
            <nav className="relative -left-40 w-32">
                {navigation.map((entryData, index) => (
                    <NavigationItem
                        entryData={entryData}
                        selected={location.pathname === entryData.href}
                        index={index}
                        key={index}
                    />
                ))}
            </nav>
        </div>
    );
}

type NavigationItemProps = {
    entryData: NavigationEntry;
    selected: boolean;
    index: number;
};

const colorPattern = [
    {
        from: "group-hover:from-violet-500",
        to: "group-hover:to-violet-700",
        selected: "from-violet-500 to-violet-700",
        textColor: "text-violet-600"
    },
    {
        from: "group-hover:from-cyan-600",
        to: "group-hover:to-cyan-700",
        selected: "from-cyan-500 to-cyan-700",
        textColor: "text-cyan-600"
    },
    {
        from: "group-hover:from-green-600",
        to: "group-hover:to-green-700",
        selected: "from-green-500 to-green-700",
        textColor: "text-green-600"
    },
    {
        from: "group-hover:from-yellow-600",
        to: "group-hover:to-yellow-700",
        selected: "from-yellow-500 to-yellow-700",
        textColor: "text-yellow-600"
    },
    {
        from: "group-hover:from-red-600",
        to: "group-hover:to-red-700",
        selected: "from-red-500 to-red-700",
        textColor: "text-red-600"
    }
];

function NavigationItem({ entryData, selected, index }: NavigationItemProps) {
    /* do specific styling for selected element*/
    const colorGradient = colorPattern[index % colorPattern.length];

    return (
        <Link
            to={entryData.href}
            className="group"
        >
            <li
                className={classNames(
                    "m-2 flex h-7 list-none items-center gap-2",
                    selected ? "text-white" : "text-zinc-600"
                )}
            >
                <div
                    className={classNames(
                        "button-highlight w-7 rounded-lg bg-gradient-to-r p-1",
                        colorGradient.from,
                        colorGradient.to,
                        selected ? colorGradient.selected : "from-zinc-700 to-zinc-800 group-hover:text-zinc-300"
                    )}
                >
                    <span className={classNames("relative", { "nav-button": !selected })}>
                        {entryData.img}
                        <ArrowRightIcon
                            className={classNames(selected ? "hidden" : "nav-arrow absolute top-0 left-0")}
                        />
                    </span>
                </div>
                <span
                    className={classNames(
                        "colorGradient.textColor text-sm font-bold",
                        selected ? colorGradient.textColor : "group-hover:text-zinc-300"
                    )}
                >
                    {entryData.text}
                </span>
            </li>
        </Link>
    );
}
