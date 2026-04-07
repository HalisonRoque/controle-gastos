import { useState, useMemo, useEffect } from "react";
import { useSnackbar } from "notistack";
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import type { CreatePersonDTO, PersonType } from "../../../types/PersonType";
import CreatePersonModal from "./CreatePersonModal";
import PersonEditModal from "./EditPersonModal";
import DeletePersonModal from "./DeletePersonModal";
import { createPerson, deletePerson, getPersons, updatePerson } from "../../../../services/person";

export default function PersonList() {
    const [data, setData] = useState<PersonType[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [dataError, setDataError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<PersonType | null>(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedPersonDelete, setSelectedPersonDelete] = useState<PersonType | null>(null);
    const [filter, setFilter] = useState("");
    const [loadingCreate, setLoadingCreate] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingFilter, setLoadingFilter] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const [reload, setReload] = useState(0);
    const [search, setSearch] = useState("");
    const pageSize = 5;

    useEffect(() => {
        getPersons(filter)
            .then((resp) => {
                setData(resp);
                setDataLoaded(true);
            })
            .catch(() => {
                setDataError(true);
                setDataLoaded(true);
            });
    }, [reload, filter]);

    const handleCreate = (person: CreatePersonDTO) => {
        setLoadingCreate(true);
        createPerson(person)
            .then(() => {
                enqueueSnackbar("Pessoa criada com sucesso!", {
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
                enqueueSnackbar("Erro ao criar pessoa", {
                    variant: "error",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });
            })
            .finally(() => setLoadingCreate(false));
    };

    const handleUpdate = (person: PersonType) => {
        setLoadingUpdate(true);
        setUpdatingId(person.id);

        updatePerson(person)
            .then(() => {
                enqueueSnackbar("Pessoa atualizada com sucesso!", {
                    variant: "success",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });
                setOpenEdit(false);
                setReload((prev) => prev + 1);
            })
            .catch(() => {
                enqueueSnackbar("Erro ao atualizar pessoa", {
                    variant: "error",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });
            })
            .finally(() => {
                setLoadingUpdate(false)
                setUpdatingId(null)
            });
    };

    const handleDelete = (id: number) => {
        setLoadingDelete(true);
        setDeletingId(id);

        deletePerson(id)
            .then(() => {
                enqueueSnackbar("Pessoa deletada com sucesso!", {
                    variant: "success",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });

                setOpenDelete(false);
                setReload((prev) => prev + 1);
                setPage(0);
            })
            .catch(() => {
                enqueueSnackbar("Erro ao deletar pessoa", {
                    variant: "error",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });
            })
            .finally(() => {
                setLoadingDelete(false);
                setDeletingId(null);
            });
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
            <h2>Lista de Pessoas</h2>
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
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Idade</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {paginatedData.map((person) => (
                                        <TableRow key={person.id}>
                                            <TableCell>{person.name}</TableCell>
                                            <TableCell>{person.age}</TableCell>
                                            <TableCell>
                                                <div className={styles.actions}>
                                                    <IconButton
                                                        size="small"
                                                        className={styles.editButton}
                                                        disabled={loadingUpdate && updatingId === person.id}
                                                        onClick={() => {
                                                            setSelectedPerson(person);
                                                            setOpenEdit(true);
                                                        }}
                                                    >
                                                        {loadingUpdate && updatingId === person.id ? (
                                                            <CircularProgress size={16} />
                                                        ) : (
                                                            <>
                                                                <span className={styles.buttonText}>Editar</span>
                                                                <EditIcon />
                                                            </>
                                                        )}
                                                    </IconButton>

                                                    <IconButton
                                                        size="small"
                                                        className={styles.deleteButton}
                                                        disabled={loadingDelete && deletingId === person.id}
                                                        onClick={() => {
                                                            setSelectedPersonDelete(person);
                                                            setOpenDelete(true);
                                                        }}
                                                    >
                                                        {loadingDelete && deletingId === person.id ? (
                                                            <CircularProgress size={16} />
                                                        ) : (
                                                            <>
                                                                <span className={styles.buttonText}>Deletar</span>
                                                                <DeleteIcon />
                                                            </>
                                                        )}
                                                    </IconButton>
                                                </div>
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
            <CreatePersonModal
                open={openCreate}
                onClose={() => setOpenCreate(false)}
                onSave={handleCreate}
            />
            <PersonEditModal
                key={selectedPerson?.id}
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                initialData={selectedPerson}
                onSave={handleUpdate}
            />
            <DeletePersonModal
                open={openDelete}
                onClose={() => setOpenDelete(false)}
                personName={selectedPersonDelete?.name}
                onDelete={() => {
                    if (selectedPersonDelete?.id) {
                        handleDelete(selectedPersonDelete.id);
                    }
                }}
            />
        </div>
    );
}
