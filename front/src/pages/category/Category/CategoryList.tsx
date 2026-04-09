import { useState, useMemo, useEffect } from "react";
import AppCard from "../../../components/AppCard";
import styles from "./styles.module.css";

import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton,
    CircularProgress,
    TextField,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import type { CategoryType, CreateCategoryDTO } from "../../../types/CategoryType";
import { useSnackbar } from "notistack";
import { createCategory, getCategory } from "../../../../services/category";
import CreateCategoryModal from "./CreateCategoryModal";

/*Componente para Listar categorias e criiar novas categorias
recebe os dados da API e lista por meio de funções mostrando as categorias.
È chamado modal para criação de categoria.
Recebe o styles padrão criação para uso do CSS na telas do componente. aplica paginação de 5 linhas para pular a próxima listagem
*/

export default function CategoryList() {
    const [data, setData] = useState<CategoryType[]>([]);
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
        getCategory(filter)
            .then((resp) => {
                setData(resp);
                setDataLoaded(true);
            })
            .catch(() => {
                setDataError(true);
                setDataLoaded(true);
            });
    }, [reload, filter]);

    const handleCreate = (category: CreateCategoryDTO) => {
        setLoadingCreate(true);
        createCategory(category)
            .then(() => {
                enqueueSnackbar("Categoria criada com sucesso!", {
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
                enqueueSnackbar("Erro ao criar categoria", {
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
            <h2>Lista de Categorias</h2>
            <div className={styles.filterContainer}>
                <TextField
                    label="Finalidade"
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
                                        <TableCell>Finalidade</TableCell>
                                        <TableCell>Descrição</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginatedData.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.purpose}</TableCell>
                                            <TableCell>{row.description}</TableCell>
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
            <CreateCategoryModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSave={handleCreate}
            />
        </div>
    );
}