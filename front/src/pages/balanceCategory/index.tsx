import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const CategoryBalanceList = React.lazy(() => import("./BalanceCategory/BalanceCategoryList"));

export const balanceRoutes = [
    {
        path: "/total/categorias",
        element: <CategoryBalanceList />,
    },
];