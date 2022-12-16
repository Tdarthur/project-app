import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import styles from "../styles/navigation.module.css";

export type NavigationEntry = {
    path: string;
    img: React.ReactElement;
    text: string;
    children?: NavigationEntry[] | null | undefined;
};

type Props = {
    navigation: NavigationEntry[];
};

export default function NavigationList({ navigation }: Props) {
    const location = useLocation();
    const currentLocationParts = location.pathname.split("/");

    const isPathActive = (path: string) => {
        const pathParts = path.split("/");

        if (pathParts.length > currentLocationParts.length) return false;

        for (let i = 0; i < pathParts.length; i++) {
            if (pathParts[i] !== currentLocationParts[i]) {
                return false;
            }
        }

        return true;
    };

    return (
        <div className="fixed w-0">
            <nav className="relative -left-40 w-32">
                {navigation.map((entryData, index) => (
                    <NavigationItem
                        entryData={entryData}
                        active={isPathActive(entryData.path)}
                        key={index}
                    />
                ))}
            </nav>
        </div>
    );
}

type NavigationItemProps = {
    entryData: NavigationEntry;
    active: boolean;
};

function NavigationItem({ entryData, active }: NavigationItemProps) {
    return (
        <Link
            to={entryData.path}
            className="group"
        >
            <li
                className={classNames(
                    "m-2 flex h-7 list-none items-center gap-2",
                    active ? "text-white" : "text-gray-600"
                )}
            >
                {/* nav icon */}
                <div
                    className={classNames(
                        "box-highlight w-7 rounded-lg bg-gradient-to-r p-1 group-hover:from-yellow-600 group-hover:to-yellow-700",
                        active ? "from-yellow-500 to-yellow-700" : "from-gray-700 to-gray-800 group-hover:text-gray-300"
                    )}
                >
                    <span className={classNames("relative", !active ? styles.navButton : "")}>
                        {entryData.img}
                        <ArrowRightIcon
                            className={classNames(styles.navArrow, active ? "hidden" : "absolute top-0 left-0")}
                        />
                    </span>
                </div>

                {/* nav text */}
                <span
                    className={classNames(
                        "colorGradient.textColor text-sm font-bold",
                        active ? "text-yellow-600" : "group-hover:text-gray-300"
                    )}
                >
                    {entryData.text}
                </span>
            </li>
        </Link>
    );
}
