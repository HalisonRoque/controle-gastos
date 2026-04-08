import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const PersonBalanceList = React.lazy(() => import("./Balance/BalanceList"));

export const balanceRoutes = [
    {
        path: "/total/contas",
        element: <PersonBalanceList />,
    },
];