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
import SearchIcon from '@mui/icons-material/Search';
import type { TransactionType } from "../../../types/TransactionType";
import { getTransaction } from "../../../../services/transaction";

/*Componente para Listar transferência
recebe os dados da API e lista por meio de funções mostrando os usuários.
aLém de botão de filtragem por pessoa.
Recebe o styles padrão criação para uso do CSS na telas do componente. 
Aplica paginação de 5 linhas para pular a próxima listagem
*/

export default function TransactionList() {
    const [data, setData] = useState<TransactionType[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataError, setDataError] = useState(false);
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    };

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
    }, [filter]);

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
                                        <TableCell>Pessoa</TableCell>
                                        <TableCell>Tipo</TableCell>
                                        <TableCell>Categoria</TableCell>
                                        <TableCell>Descrição</TableCell>
                                        <TableCell>Valor</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginatedData.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.person}</TableCell>
                                            <TableCell>{row.type}</TableCell>
                                            <TableCell>{row.category}</TableCell>
                                            <TableCell>{row.description}</TableCell>
                                            <TableCell>
                                                {formatCurrency(row.value)}
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
        </div>
    );
}