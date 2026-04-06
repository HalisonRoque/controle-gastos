import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const CategoryList = React.lazy(() => import("./Category/index"));

export const categoryRoutes = [
    {
        path: "/categorias",
        element: <CategoryList />,
    },
];