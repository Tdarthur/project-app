import { Outlet, useLocation, useRouteError, Link } from "react-router-dom";

import Header from "./components/Header";
import NavigationList, { NavigationEntry } from "./components/NavigationList";

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
            img: <></>,
            text: "Home"
        },
        {
            href: "/projects",
            img: <></>,
            text: "Projects"
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
            <NavigationList navigation={navigation} />
            {!error ? (
                <main className="mt-20 p-8 text-white">
                    <Outlet />
                </main>
            ) : (
                <main className="mt-20 p-8 text-center text-red-400">
                    <h2 className="text-2xl font-bold">
                        Please return to the{" "}
                        <Link
                            to="/"
                            className="text-red-500 underline transition-colors hover:text-white"
                        >
                            home page
                        </Link>{" "}
                        or try again
                    </h2>
                </main>
            )}
        </>
    );
}

export default Layout;
