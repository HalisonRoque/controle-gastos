import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { RouterConfigData } from "../../../pages/routers/routesConfig";

type Props = {
    item: RouterConfigData;
    level: number;
};

const VerticalItem = ({ item }: Props) => {
    const navigate = useNavigate();

    return (
        <ListItemButton
            onClick={() => item.url && navigate(item.url)}
            sx={{
                color: "#0a0f1a",
                paddingY: 1.5,
                paddingX: 2,
                borderRadius: "0.8rem",
                marginX: 1,
                marginY: 0.5,

                "&:hover": {
                    backgroundColor: "#2f7fc0",
                },
            }}
        >
            {item.icon && (
                <ListItemIcon
                    sx={{
                        color: "#0a0f1a",
                        minWidth: "4.0rem",
                    }}
                >
                    {item.icon}
                </ListItemIcon>
            )}

            <ListItemText
                primary={
                    <Typography fontSize="1.6rem" fontWeight={500}>
                        {item.title}
                    </Typography>
                }
            />
        </ListItemButton>
    );
};

export default VerticalItem;