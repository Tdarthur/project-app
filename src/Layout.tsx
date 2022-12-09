import { Outlet } from "react-router-dom";

import Navbar, { NavigationEntry } from "./components/Navbar";

function Layout() {
    const navigation: NavigationEntry[] = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "About", href: "/about" }
    ];

    return (
        <>
            <Navbar navigation={navigation} />
            <main className="p-8 text-white">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
