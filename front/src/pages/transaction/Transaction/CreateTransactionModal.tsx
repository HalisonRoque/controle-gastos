import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from "@mui/material";
import { useState } from "react";
import { PURPOSE_OPTIONS } from "../../../constants/purpose";
import type { CreateTransactionDTO } from "../../../types/TransactionType";
import styles from "./styles.module.css";

type TransactionModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (person: CreateTransactionDTO) => void;
};

export default function CreateTransactionModal({
    open,
    onClose,
    onSave,
}: TransactionModalProps) {
    const [errors, setErrors] = useState({
        type: "",
        value: "",
        personId: "",
    });
    const [form, setForm] = useState<CreateTransactionDTO>({
        description: "",
        type: "",
        value: 0,
        personId: 0,
        categoryId: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof CreateTransactionDTO, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        const newErrors = {
            type: "",
            value: "",
            personId: "",
        };

        if (!form.type.trim()) {
            newErrors.type = "Tipo deve ser preenchido!";
        }
        if (form.value === null) {
            newErrors.value = "Valor deve ser preenchido";
        }
        if (form.personId === null) {
            newErrors.personId = "Pessoa deve ser preenchido";
        }

        setErrors(newErrors);

        if (newErrors.value || newErrors.type || newErrors.personId) return;

        onSave(form);

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
            personId: "",
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
        setErrors((prev) => ({ ...prev }));
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth maxWidth="sm"
        >

            <DialogTitle className={styles.modalTitle}>
                Nova Transação
            </DialogTitle>

            <DialogContent className={styles.modalContent}>
                <FormControl fullWidth margin="normal" error={!!errors.type}>
                    <InputLabel id="purpose-label">Tipo</InputLabel>

                    <Select
                        labelId="type-label"
                        value={form.type}
                        label="Finalidade"
                        onChange={(e) => {
                            handleChange("type", e.target.value);
                            setErrors((prev) => ({ ...prev, type: "" }));
                        }}
                    >
                        <MenuItem value="">
                            <em>Selecione...</em>
                        </MenuItem>

                        {PURPOSE_OPTIONS.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors.type &&
                        <FormHelperText>{errors.type}</FormHelperText>
                    }
                </FormControl>
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