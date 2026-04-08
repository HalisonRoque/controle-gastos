import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { useState } from "react";
import type { CreatePersonDTO } from "../../../types/PersonType";
import styles from "./styles.module.css";

type PersonModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (person: CreatePersonDTO) => void;
};

export default function CreatePersonModal({
    open,
    onClose,
    onSave,
}: PersonModalProps) {
    const [errors, setErrors] = useState({
        name: "",
        age: "",
    });
    const [form, setForm] = useState<CreatePersonDTO>({
        name: "",
        age: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof CreatePersonDTO, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        const newErrors = {
            name: "",
            age: "",
        };

        if (!form.name.trim()) {
            newErrors.name = "Nome deve ser preenchido!";
        }

        if (form.age <= 0) {
            newErrors.age = "Idade deve ser maior que zero";
        }

        setErrors(newErrors);

        if (newErrors.name || newErrors.age) return;

        onSave(form);

        setForm({
            name: "",
            age: 0,
        });

        setErrors({
            name: "",
            age: "",
        });
    };

    const handleClose = () => {
        setForm({
            name: "",
            age: 0,
        });
        setErrors((prev) => ({ ...prev, age: "" }));
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth maxWidth="sm"
        >

            <DialogTitle className={styles.modalTitle}>
                Nova Pessoa
            </DialogTitle>

            <DialogContent className={styles.modalContent}>
                <TextField
                    label="Nome"
                    fullWidth
                    margin="normal"
                    value={form.name}
                    error={!!errors.name}
                    helperText={errors.name}
                    onChange={(e) => {
                        handleChange("name", e.target.value);
                        setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                />

                <TextField
                    label="Idade"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={form.age === 0 ? "" : form.age}
                    slotProps={{
                        input: {
                            inputProps: { min: 0 },
                        },
                    }}
                    error={!!errors.age}
                    helperText={errors.age}
                    onChange={(e) => {
                        const value = e.target.value;
                        handleChange("age", value === "" ? 0 : Number(value));
                        setErrors((prev) => ({ ...prev, age: "" }));
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