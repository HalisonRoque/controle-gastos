
import { useState, useEffect } from "react";
import AppCard from "../../../components/AppCard";
import styles from "./styles.module.css";
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import { getCategoryBalance } from "../../../../services/transaction";
import type { CategoryBalanceType } from "../../../types/TransactionType";

export default function CategoryBalanceList() {
    const [data, setData] = useState<CategoryBalanceType[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const [totals, setTotals] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balanceItem: 0,
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    useEffect(() => {
        getCategoryBalance()
            .then((resp) => {
                setData(resp.data);
                setTotals({
                    totalIncome: resp.totalIncome,
                    totalExpenses: resp.totalExpenses,
                    balanceItem: resp.balance,
                });
                setDataLoaded(true);
            })
            .catch(() => {
                setDataError(true);
                setDataLoaded(true);
            });
    }, [page]);

    const getSaldoColor = (value: number) => {
        if (value > 0) return "green";
        if (value < 0) return "red";
        return "blue";
    };

    const paginatedData = data.slice(
        page * pageSize,
        (page + 1) * pageSize
    );

    return (
        <div className={styles.container}>
            <h2>Totais por Categoria</h2>
            <AppCard>
                {!dataLoaded ? (
                    <div>Carregando...</div>
                ) : dataError ? (
                    <div>Erro ao carregar dados</div>
                ) : (
                    <>
                        <Table className={styles.table}>
                            <TableHead>
                                <TableRow className={styles.tableHeader}>
                                    <TableCell>Categoria</TableCell>
                                    <TableCell>Receitas</TableCell>
                                    <TableCell>Despesas</TableCell>
                                    <TableCell>Saldo</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {paginatedData.map((row) => (
                                    <TableRow key={row.categoryId}>
                                        <TableCell>{row.categoryDescription}</TableCell>
                                        <TableCell>
                                            {formatCurrency(row.totalIncome)}
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(row.totalExpenses)}
                                        </TableCell>
                                        <TableCell style={{
                                            color: getSaldoColor(row.balanceItem),
                                            fontWeight: "bold"
                                        }}>
                                            {formatCurrency(row.balanceItem)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className={styles.footer}>
                            <Button
                                disabled={page === 0}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Anterior
                            </Button>

                            <span style={{ fontSize: "1.0rem", margin: "0 8px" }}>{page + 1}</span>

                            <Button
                                disabled={(page + 1) * pageSize >= data.length}
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Próxima
                            </Button>
                        </div>
                    </>
                )}
            </AppCard>
            <AppCard>
                <div style={{ padding: "16px" }}>
                    <h3>Total Geral</h3>

                    <Table className={styles.table}>
                        <TableHead>
                            <TableRow className={styles.tableHeader}>
                                <TableCell>Receitas</TableCell>
                                <TableCell>Despesas</TableCell>
                                <TableCell>Saldo</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <strong>{formatCurrency(totals.totalIncome)}</strong>
                                </TableCell>

                                <TableCell>
                                    <strong>{formatCurrency(totals.totalExpenses)}</strong>
                                </TableCell>

                                <TableCell
                                    style={{
                                        color: getSaldoColor(totals.balanceItem),
                                        fontWeight: "bold",
                                    }}
                                >
                                    <strong>{formatCurrency(totals.balanceItem)}</strong>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </AppCard>
        </div>
    );
}