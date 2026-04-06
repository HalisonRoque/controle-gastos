import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const PersonList = React.lazy(() => import("./Person/index"));

export const personRoutes = [
    {
        path: "/pessoas",
        element: <PersonList />,
    },
];