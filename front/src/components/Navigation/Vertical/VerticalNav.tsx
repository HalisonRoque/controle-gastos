import React from "react";
import List from "@mui/material/List";
import routesConfig from "../../../pages/routers/routesConfig";
import NavVerticalGroup from "./VerticalNavGroup";
import VerticalItem from "./VerticalItem";
import type { RouterConfigData } from "../../../pages/routers/routesConfig";

/*Componente Menu lateral e navegação de telas*/
const VerticalNav = () => {
    return (
        <List
            sx={{
                position: "relative",
                padding: 0,
            }}
            component="div"
        >
            {routesConfig.map((item: RouterConfigData) => (
                <React.Fragment key={item.id}>
                    {item.type === "group" && <NavVerticalGroup item={item} level={0} />}

                    {item.type === "item" && <VerticalItem item={item} level={0} />}
                </React.Fragment>
            ))}
        </List>
    );
};

export default VerticalNav;
