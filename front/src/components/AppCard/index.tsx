import {
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import type { ReactNode } from "react";
import styles from "./styles.module.css";

/*Componente AppCard padrão usado em vários lugares do código */

type AppCardProps = {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
};

export default function AppCard({
  title,
  action,
  children,
}: AppCardProps) {
  return (
    <Card className={styles.card}>
      {title && (
        <CardHeader
          title={<span className={styles.title}>{title}</span>}
          action={action}
          className={styles.header}
        />
      )}

      <CardContent className={styles.content}>
        <Box className={styles.tableContainer}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}