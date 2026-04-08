import { useState, useMemo, useEffect } from "react";
import AppCard from "../../../components/AppCard";
import styles from "./styles.module.css";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    IconButton,
    CircularProgress,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useSnackbar } from "notistack";
import type { CreateTransactionDTO, TransactionType } from "../../../types/TransactionType";
import { createTransaction, getTransaction } from "../../../../services/transaction";
import CreateTransactionModal from "./CreateTransactionModal";

export default function TransactionList() {
    const [data, setData] = useState<TransactionType[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [reload, setReload] = useState(0);
    const [openCreate, setOpenCreate] = useState(false);
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [search, setSearch] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 5;

    useEffect(() => {
        getTransaction(filter)
            .then((resp) => {
                setData(resp);
                setDataLoaded(true);
            })
            .catch(() => {
                setDataError(true);
                setDataLoaded(true);
            });
    }, [reload, filter]);

    const handleCreate = (transaction: CreateTransactionDTO) => {
        setLoadingCreate(true);
        createTransaction(transaction)
            .then(() => {
                enqueueSnackbar("Transação criada com sucesso!", {
                    variant: "success",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });

                setOpenCreate(false);
                setReload((prev) => prev + 1);
            })
            .catch(() => {
                enqueueSnackbar("Erro ao criar nova transação", {
                    variant: "error",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });
            })
            .finally(() => setLoadingCreate(false));
    };

    const handleClearFilter = () => {
        setFilter("");
        setSearch("");
        setPage(0);
    };

    const paginatedData = useMemo(() => {
        const start = page * pageSize;
        return data.slice(start, start + pageSize);
    }, [data, page]);

    return (
        <div className={styles.container}>
            <h2>Lista de Transações</h2>
            <div className={styles.filterContainer}>
                <TextField
                    label="Buscar Pessoa"
                    size="small"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <IconButton
                    size="small"
                    className={styles.successButton}
                    onClick={() => {
                        setLoadingFilter(true);
                        setFilter(search);
                        setPage(0);

                        setTimeout(() => setLoadingFilter(false), 500);
                    }}
                >
                    {loadingFilter ? (
                        <CircularProgress size={16} />
                    ) : (
                        <>
                            <span className={styles.buttonText}>Filtrar</span>
                            <SearchIcon />
                        </>
                    )}
                </IconButton>

                {filter && (
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleClearFilter}
                    >
                        Limpar
                    </Button>
                )}
            </div>

            <AppCard>
                {!dataLoaded ? (
                    <div>Carregando...</div>
                ) : dataError ? (
                    <div>Erro ao carregar dados</div>
                ) :
                    (
                        <>
                            <Table className={styles.table}>
                                <TableHead>
                                    <TableRow className={styles.tableHeader}>
                                        <TableCell>nome</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Receita</TableCell>
                                        <TableCell>Despesas</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginatedData.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.nome}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.receita}</TableCell>
                                            <TableCell>{row.despesa}</TableCell>
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
            <div className={styles.footer}>
                <IconButton
                    size="small"
                    className={styles.addButton}
                    onClick={() => setOpenCreate(true)}
                    disabled={loadingCreate}
                >
                    {loadingCreate ? (
                        <CircularProgress size={16} />
                    ) : (
                        <>
                            <span className={styles.buttonText}>Novo</span>
                            <AddIcon />
                        </>
                    )}
                </IconButton>
            </div>
            <CreateTransactionModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSave={handleCreate}
            />
        </div>
    );
}