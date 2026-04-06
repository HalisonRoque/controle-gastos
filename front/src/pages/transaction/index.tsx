import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const TransactionList = React.lazy(() => import("./Transaction/index"));

export const transactionRoutes = [
    {
        path: "/transações",
        element: <TransactionList />,
    },
];