import { Box, Typography } from "@mui/material";
import WidgetsIcon from '@mui/icons-material/Widgets';
import styles from "./styles.module.css";

export default function Home() {
    return (
        <Box>
            <Typography variant="h4" className={styles.title}>
                CONTROLE DE GASTOS
            </Typography>

            <Box className={styles.iconContainer}>
                <WidgetsIcon className={styles.icon} />
            </Box>
        </Box>
    );
}