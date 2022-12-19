import { matchPath, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CubeIcon, HomeIcon, IdentificationIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Header from "./components/Header";
import NavigationList, { NavigationEntry } from "./components/NavigationList";

import ErrorPage from "./routes/ErrorPage";

type Props = {
    error?: boolean;
};

function Layout({ error = false }: Props) {
    const location = useLocation();

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
            path: "/contact",
            img: <IdentificationIcon />,
            text: "Contact Me"
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
