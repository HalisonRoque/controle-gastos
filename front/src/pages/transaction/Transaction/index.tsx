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
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import type { TransactionType } from "../../../types/TransactionType";

export default function TransactionList() {
    const [data] = useState<TransactionType[]>([
        { id: 1, nome: "joão", description: "João", type: '-', personId: 1, categoryId: 1, receita: 0, despesa: 10 },
        { id: 2, nome: "maria", description: "Maria", type: '-', personId: 1, categoryId: 1, receita: 0, despesa: 10 },
        { id: 3, nome: "carlos", description: "Carlos", type: '-', personId: 1, categoryId: 1, receita: 0, despesa: 10 },
        { id: 1, nome: "joão", description: "João", type: '-', personId: 1, categoryId: 1, receita: 0, despesa: 10 },
        { id: 2, nome: "maria", description: "Maria", type: '-', personId: 1, categoryId: 1, receita: 0, despesa: 10 },
        { id: 3, nome: "carlos", description: "Carlos", type: '-', personId: 1, categoryId: 1, receita: 0, despesa: 10 },

    ]);

    const [filter, setFilter] = useState("");
    const [page, setPage] = useState(0);

    const pageSize = 5;

    const filteredData = useMemo(() => {
        return data.filter((p) =>
            p.description.toLowerCase().includes(filter.toLowerCase())
        );
    }, [data, filter]);

    const paginatedData = useMemo(() => {
        const start = page * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page]);

    return (
        <div className={styles.container}>
            <h2>Lista de Transações</h2>
            <div className={styles.filterContainer}>
                <TextField
                    label="Buscar Pessoa"
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