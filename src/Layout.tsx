import { Outlet, useLocation, useRouteError } from "react-router-dom";

import Header from "./components/Header";
import NavigationList, { NavigationEntry } from "./components/NavigationList";

import { ArrowRightIcon, HomeIcon, IdentificationIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
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
            href: "/",
            img: <HomeIcon />,
            text: "Home"
        },
        {
            href: "/projects",
            img: <MagnifyingGlassIcon />,
            text: "Projects"
        },
        {
            href: "/about",
            img: <QuestionMarkCircleIcon />,
            text: "About"
        },
        {
            href: "/contact",
            img: <IdentificationIcon />,
            text: "Contact Me"
        },
        {
            href: "/test",
            img: <ArrowRightIcon />,
            text: "Test"
        }
    ];

    let pageName = navigation.find((navigationEntry) => navigationEntry.href === location.pathname)?.text;

    if (error) {
        const displayableError = errorData as DisplayableError;

        if (displayableError.status && displayableError.statusText) {
            pageName = `${displayableError.status} (${displayableError.statusText})`;
        }
    }

    if (!pageName) {
        pageName = "An Unexpected Error Occurred";
    }

    return (
        <>
            <Header
                pageName={pageName!}
                error={error}
            />
            <div>
                <span className="block h-28" />
                <NavigationList navigation={navigation} />
                <main className="min-h-screen px-8 text-white">{!error ? <Outlet /> : <ErrorPage />}</main>
            </div>
        </>
    );
}

export default Layout;
