import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import AboutPage from "./routes/AboutPage";
import ContactPage from "./routes/ContactPage";
import HomePage from "./routes/HomePage";
import ProjectsPage from "./routes/ProjectsPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: (
            <>
                <Layout error></Layout>
            </>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/projects",
                element: <ProjectsPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            },
            {
                path: "/contact",
                element: <ContactPage />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
