import { matchPath, Outlet, useLocation, useRouteError } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
    ComputerDesktopIcon,
    CubeIcon,
    HomeIcon,
    IdentificationIcon,
    MagnifyingGlassIcon
} from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

import Header from "./components/Header";
import NavigationList, { NavigationEntry } from "./components/NavigationList";

import ErrorPage from "./routes/ErrorPage";

type Props = {
    error?: boolean;
};

type DisplayableError = {
    status: string;
    statusText: string;
};

function Layout({ error = false }: Props) {
    const location = useLocation();
    const errorData = useRouteError();

    const navigation: NavigationEntry[] = [
        {
            path: "/",
            img: <HomeIcon />,
            text: "Home"
        },
        {
            path: "/projects",
            img: <MagnifyingGlassIcon />,
            text: "Projects",
            children: [
                {
                    path: "/projects/cube",
                    img: <CubeIcon />,
                    text: "Cube"
                }
            ]
        },
        {
            path: "/about",
            img: <QuestionMarkCircleIcon />,
            text: "About"
        },
        {
            path: "/contact",
            img: <IdentificationIcon />,
            text: "Contact Me"
        },
        {
            path: "/test",
            img: <ComputerDesktopIcon />,
            text: "Test"
        }
    ];

    const findPageEntry = (navigationList: NavigationEntry[]): NavigationEntry | null => {
        for (let i = 0; i < navigationList.length; i++) {
            if (matchPath(navigationList[i].path, location.pathname)) {
                return navigationList[i];
            }

            if (navigationList[i].children) {
                let potentialPageEntry = findPageEntry(navigationList[i].children!);
                if (potentialPageEntry) {
                    return potentialPageEntry;
                }
            }
        }

        return null;
    };

    let pageName = findPageEntry(navigation)?.text;

    if (error) {
        const displayableError = errorData as DisplayableError;

        if (displayableError.status && displayableError.statusText) {
            pageName = `${displayableError.status} (${displayableError.statusText})`;
        }
    }

    if (!pageName) {
        console.error(error);
        pageName = "An Unexpected Error Occurred";
    }

    return (
        <>
            <Header
                pageName={pageName!}
                error={error}
            />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
                gutter={1}
            />
            <div>
                <span className="block h-28" />
                <NavigationList navigation={navigation} />
                <main className="px-8 pb-8 text-white">{!error ? <Outlet /> : <ErrorPage />}</main>
            </div>
        </>
    );
}

export default Layout;
