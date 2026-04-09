import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { PURPOSE_OPTIONS } from "../../../constants/purpose";
import type { CreateTransactionDTO } from "../../../types/TransactionType";
import type { CategoryType } from "../../../types/CategoryType";
import { getCategory } from "../../../../services/category";
import styles from "./styles.module.css";

/*Criação de Modal para criação de pessoas transação por pessoa
onde envia ao banco de dados para poder salvar uma nova transação */

type TransactionModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (transaction: CreateTransactionDTO) => void;
    personId: number;
    age: number;
};

export default function CreateTransactionModal({
    open,
    onClose,
    onSave,
    personId,
    age
}: TransactionModalProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [form, setForm] = useState<CreateTransactionDTO>({
        description: "",
        type: "",
        value: 0,
        personId: 0,
        categoryId: 0,
    });
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [errors, setErrors] = useState({
        type: "",
        value: "",
        categoryId: "",
    });

    useEffect(() => {
        getCategory()
            .then((resp) => setCategories(resp))
            .catch(() => {
                enqueueSnackbar("Erro ao carregar categorias", {
                    variant: "error",
                    anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                    },
                });
            });
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof CreateTransactionDTO, value: any) => {
        if (field === "type") {
            setForm((prev) => ({
                ...prev,
                type: value,
                categoryId: 0
            }));

            setErrors((prev) => ({
                ...prev,
                type: "",
                categoryId: ""
            }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    const handleSave = () => {
        const newErrors = {
            type: "",
            value: "",
            categoryId: "",
        };

        if (!form.type) newErrors.type = "Tipo é obrigatório";
        if (form.value <= 0) newErrors.value = "Valor deve ser maior que 0";
        if (!form.categoryId) newErrors.categoryId = "Categoria é obrigatória";
        if (age < 18 && form.type === "Receita") newErrors.type = "Menores de idade só podem ter despesas";

        setErrors(newErrors);

        if (newErrors.type || newErrors.value || newErrors.categoryId) return;

        onSave({
            ...form,
            personId: personId
        });

        setForm({
            description: "",
            type: "",
            value: 0,
            personId: 0,
            categoryId: 0,
        });

        setErrors({
            type: "",
            value: "",
            categoryId: "",
        });
    };

    const handleClose = () => {
        setForm({
            description: "",
            type: "",
            value: 0,
            personId: 0,
            categoryId: 0,
        });

        setErrors({
            type: "",
            value: "",
            categoryId: "",
        });

        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle className={styles.modalTitle}>
                Nova Transação
            </DialogTitle>

            <DialogContent className={styles.modalContent}>
                <FormControl fullWidth margin="normal" error={!!errors.type}>
                    <InputLabel id="type-label">Tipo</InputLabel>

                    <Select
                        labelId="type"
                        value={form.type}
                        label="Tipo"
                        onChange={(e) =>
                            handleChange("type", e.target.value)
                        }
                    >
                        <MenuItem value="">
                            <em>Selecione...</em>
                        </MenuItem>

                        {PURPOSE_OPTIONS
                            .filter((option) => {
                                if (age < 18 && option === "Receita") return false;
                                return true;
                            })
                            .map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                    </Select>

                    {errors.type && (
                        <FormHelperText>{errors.type}</FormHelperText>
                    )}
                </FormControl>

                <FormControl
                    fullWidth
                    margin="normal"
                    error={!!errors.categoryId}
                >
                    <InputLabel id="category">Categoria</InputLabel>

                    <Select
                        labelId="category"
                        value={form.categoryId === 0 ? "" : form.categoryId}
                        label="Categoria"
                        onChange={(e) =>
                            handleChange("categoryId", Number(e.target.value))
                        }
                    >
                        <MenuItem value="">
                            <em>Selecione...</em>
                        </MenuItem>

                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.purpose}
                            </MenuItem>
                        ))}
                    </Select>

                    {errors.categoryId && (
                        <FormHelperText>{errors.categoryId}</FormHelperText>
                    )}
                </FormControl>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Valor"
                    type="number"
                    value={form.value === 0 ? "" : form.value}
                    onChange={(e) =>
                        handleChange("value", e.target.value === "" ? 0 : Number(e.target.value))
                    }
                    error={!!errors.value}
                    helperText={errors.value}
                />

                <TextField
                    fullWidth
                    margin="normal"
                    label="Descrição"
                    value={form.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                />
            </DialogContent>

            <DialogActions className={styles.modalActions}>
                <Button
                    className={styles.cancelButton}
                    onClick={handleClose}
                >
                    Cancelar
                </Button>

                <Button
                    className={styles.saveButton}
                    variant="contained"
                    onClick={handleSave}
                >
                    Salvar
                </Button>
            </DialogActions>

        </Dialog>
    );
}