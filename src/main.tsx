import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Layout";
import Home from "./routes/Home";
import Projects from "./routes/Projects";

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
                element: <Home />
            },
            {
                path: "/projects",
                element: <Projects />
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
