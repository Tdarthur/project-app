import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

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
        <nav className="">
            {navigation.map((entryData) => (
                <NavigationItem
                    entryData={entryData}
                    selected={location.pathname === entryData.href}
                />
            ))}
        </nav>
    );
}

type NavigationItemProps = {
    entryData: NavigationEntry;
    selected: boolean;
};

function NavigationItem({ entryData, selected }: NavigationItemProps) {
    /* do specific styling for selected element*/
    return (
        <li className={classNames("text-green-300")}>
            <Link to={entryData.href}>
                {entryData.img}
                <span>{entryData.text}</span>
            </Link>
        </li>
    );
}
