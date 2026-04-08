
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
import { getPersonBalance } from "../../../../services/transaction";
import type { PersonBalanceType } from "../../../types/TransactionType";

export default function CategoryBalanceList() {
    const [data, setData] = useState<PersonBalanceType[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const [totals, setTotals] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
    });

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

    useEffect(() => {
        getPersonBalance()
            .then((resp) => {
                setData(resp.data);
                setTotals({
                    totalIncome: resp.totalIncome,
                    totalExpenses: resp.totalExpenses,
                    balance: resp.balance,
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

    return (
        <div className={styles.container}>
            <h2>Totais por Pessoa</h2>
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
                                    <TableCell>Pessoa</TableCell>
                                    <TableCell>Receitas</TableCell>
                                    <TableCell>Despesas</TableCell>
                                    <TableCell>Saldo</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.personId}>
                                        <TableCell>{row.personName}</TableCell>
                                        <TableCell>
                                            {formatCurrency(row.totalIncome)}
                                        </TableCell>
                                        <TableCell>
                                            {formatCurrency(row.totalExpenses)}
                                        </TableCell>
                                        <TableCell style={{
                                            color: getSaldoColor(row.balance),
                                            fontWeight: "bold"
                                        }}>
                                            {formatCurrency(row.balance)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className={styles.footer}>
                            <Button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                            >
                                Anterior
                            </Button>

                            <span style={{ fontSize: "1.0rem", margin: "0 8px" }}>{page + 1}</span>

                            <Button
                                disabled={data.length < pageSize}
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
                                        color: getSaldoColor(totals.balance),
                                        fontWeight: "bold",
                                    }}
                                >
                                    <strong>{formatCurrency(totals.balance)}</strong>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </AppCard>
        </div>
    );
}