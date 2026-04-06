import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const Home = React.lazy(() => import("./Home/index"));

export const homeRoutes = [
    {
        path: "/",
        element: <Home />,
    },
];