import { useState, useMemo } from "react";
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
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

type ICategoryType = {
    id: number;
    description: string;
    purpose: string;
};

export default function CategoryList() {
    const [data] = useState<ICategoryType[]>([
        { id: 1, description: "João", purpose: '25' },
        { id: 2, description: "Maria", purpose: '30' },
        { id: 3, description: "Carlos", purpose: '22' },
        { id: 1, description: "João", purpose: '25' },
        { id: 2, description: "Maria", purpose: '30' },
        { id: 3, description: "Carlos", purpose: '22' },
    ]);

    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);

    const pageSize = 5;

    const filteredData = useMemo(() => {
        return data.filter((p) =>
            p.purpose.toLowerCase().includes(filter.toLowerCase())
        );
    }, [data, filter]);

    const paginatedData = useMemo(() => {
        const start = page * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page]);

    return (
        <div className={styles.container}>
            <h2>Lista de Categorias</h2>
            <div className={styles.filterContainer}>
                <TextField
                    label="Buscar Categoria"
                    size="small"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />

                <IconButton size="small" className={styles.successButton}>
                    <span className={styles.buttonText}>Filtrar</span>
                    <SearchIcon />
                </IconButton>
            </div>

            <AppCard>
                <Table className={styles.table}>
                    <TableHead>
                        <TableRow className={styles.tableHeader}>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Finalidade</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {paginatedData.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.description}</TableCell>
                                <TableCell>{person.purpose}</TableCell>
                                <TableCell>
                                    <div className={styles.actions}>
                                        <IconButton size="small" className={styles.editButton}>
                                            <span className={styles.buttonText}>Editar</span>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton size="small" className={styles.deleteButton}>
                                            <span className={styles.buttonText}>Deletar</span>
                                            <DeleteIcon />
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

                    <span>{page + 1}</span>

                    <Button
                        disabled={(page + 1) * pageSize >= filteredData.length}
                        onClick={() => setPage((p) => p + 1)}
                    >
                        Próxima
                    </Button>
                </div>
            </AppCard>
            <div className={styles.footer}>
                <IconButton size="small" className={styles.addButton}>
                    <span className={styles.buttonText}>Novo</span>
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    );
}