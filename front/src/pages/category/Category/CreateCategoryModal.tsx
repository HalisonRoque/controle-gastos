import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { useState } from "react";
import type { CreateCategoryDTO } from "../../../types/CategoryType";
import styles from "./styles.module.css";

type CategoryModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (person: CreateCategoryDTO) => void;
};

export default function CreateCategoryModal({
    open,
    onClose,
    onSave,
}: CategoryModalProps) {
    const [errors, setErrors] = useState({
        purpose: "",
    });
    const [form, setForm] = useState<CreateCategoryDTO>({
        purpose: "",
        description: "",
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof CreateCategoryDTO, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        const newErrors = {
            purpose: "",
        };

        if (!form.purpose.trim()) {
            newErrors.purpose = "Finalidade deve ser preenchida!";
        }

        setErrors(newErrors);
        if (newErrors.purpose) return;

        onSave(form);
        setForm({
            purpose: "",
            description: "",
        });

        setErrors({
            purpose: "",
        });
    };

    const handleClose = () => {
        setForm({
            purpose: "",
            description: "",
        });
        setErrors((prev) => ({ ...prev, purpose: "" }));
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth maxWidth="sm"
        >
            <DialogTitle className={styles.modalTitle}>
                Nova Categoria
            </DialogTitle>

            <DialogContent className={styles.modalContent}>
                <TextField
                    label="Finalidade"
                    fullWidth
                    margin="normal"
                    value={form.purpose}
                    error={!!errors.purpose}
                    helperText={errors.purpose}
                    onChange={(e) => {
                        handleChange("purpose", e.target.value);
                    }}
                />

                <TextField
                    label="Descrição"
                    fullWidth
                    margin="normal"
                    value={form.description}
                    onChange={(e) => {
                        handleChange("description", e.target.value);
                    }}
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
