import type { ReactNode } from "react";
import CategoryIcon from '@mui/icons-material/Category';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import RepeatOnIcon from '@mui/icons-material/RepeatOn';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AllInboxIcon from '@mui/icons-material/AllInbox';

export interface RouterConfigData {
    id: string;
    title: string;
    message: string;
    icon?: ReactNode;
    type: "item" | "group";
    children?: RouterConfigData[];
    url?: string;
}

const routesConfig: RouterConfigData[] = [
    {
        id: "app",
        title: "Menu",
        message: "Menu",
        type: "group",
        children: [
            {
                id: "home",
                title: "Home",
                message: "Home",
                type: "item",
                icon: <HomeIcon />,
                url: "/",
            },
            {
                id: "category",
                title: "Categorias",
                message: "Categorias",
                type: "item",
                icon: <CategoryIcon />,
                url: "/categorias",
            },
            {
                id: "person",
                title: "Pessoas",
                message: "Pessoas",
                type: "item",
                icon: <PeopleIcon />,
                url: "/pessoas",
            },
            {
                id: "transaction",
                title: "Transações",
                message: "Transações",
                type: "item",
                icon: <RepeatOnIcon />,
                url: "/transações",
            },
            {
                id: "categotyBalance",
                title: "Total Categorias",
                message: "Total Categorias",
                type: "item",
                icon: <PointOfSaleIcon />,
                url: "/total/categorias",
            },
            {
                id: "balance",
                title: "Total Pessoas",
                message: "Total Pessoas",
                type: "item",
                icon: <AllInboxIcon />,
                url: "/total/pessoas",
            },
        ],
    },
];

export default routesConfig;