import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import ContactPage from "./routes/ContactPage";
import HomePage from "./routes/HomePage";
import CubePage from "./routes/projects/cube/CubePage";
import ProjectsPage from "./routes/ProjectsPage";

const routes = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <Layout error />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/projects",
                element: <ProjectsPage />,
                children: [
                    {
                        path: "/projects/cube",
                        element: <CubePage />
                    }
                ]
            },
            {
                path: "/contact",
                element: <ContactPage />
            }
        ]
    }
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
