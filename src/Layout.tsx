import { matchPath, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { EnvelopeIcon, HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import Header from "./components/Header";
import NavigationList, { NavigationEntry, NavigationEntryChild } from "./components/NavigationList";

import ErrorPage from "./routes/ErrorPage";
import { useRef } from "react";

type Props = {
    error?: boolean;
};

function Layout({ error = false }: Props) {
    const mainContentRef = useRef<HTMLElement>(null);

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
                    text: "Cube"
                },
                {
                    path: "/projects/gooey",
                    text: "Gooey"
                },
                {
                    path: "/projects/thing",
                    text: "Thing"
                }
            ]
        },
        {
            path: "/contact",
            img: <EnvelopeIcon />,
            text: "Contact Me"
        }
    ];

    const findPageEntry = (navigationList: NavigationEntry[]): NavigationEntry | NavigationEntryChild | null => {
        for (let i = 0; i < navigationList.length; i++) {
            if (matchPath(navigationList[i].path, location.pathname)) {
                return navigationList[i];
            }

            const navigationChildren = navigationList[i].children;
            if (navigationChildren) {
                for (let j = 0; j < navigationChildren.length; j++) {
                    if (matchPath(navigationChildren[j].path, location.pathname)) {
                        return navigationChildren[j];
                    }
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
                <main
                    id="main_content"
                    className="px-8 pb-8 text-white"
                    ref={mainContentRef}
                >
                    {!error ? <Outlet context={{ mainContentRef }} /> : <ErrorPage />}
                </main>
            </div>
        </>
    );
}

export default Layout;
