import { ListSubheader } from "@mui/material";
import type { RouterConfigData } from "../../../pages/routers/routesConfig";
import VerticalItem from "./VerticalItem";

type Props = {
    item: RouterConfigData;
    level: number;
};

const NavVerticalGroup = ({ item }: Props) => {
    return (
        <>
            <ListSubheader
                sx={{
                    backgroundColor: "transparent",
                    color: "#0a0f1a",
                    fontSize: "2.0rem",
                    fontWeight: "bold",
                    padding: "1.6rem 2.0rem",
                    lineHeight: "2.4rem",
                }}
            >{item.title}</ListSubheader>

            {item.children?.map((child) => (
                <VerticalItem key={child.id} item={child} level={1} />
            ))}
        </>
    );
};

export default NavVerticalGroup;