import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from "@mui/material";
import { useState } from "react";
import type { PersonType } from "../../../types/PersonType";
import styles from "./styles.module.css";

type PersonModalProps = {
    open: boolean;
    onClose: () => void;
    onSave: (person: PersonType) => void;
    initialData?: PersonType | null;
};

export default function PersonModal({
    open,
    onClose,
    onSave,
}: PersonModalProps) {
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<PersonType>({
        name: "",
        age: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof PersonType, value: any) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        if (form.age <= 0) {
            setError("Idade deve ser maior que zero");
            return;
        }

        setError(null);
        onSave(form);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle className={styles.modalTitle}>
                Nova Pessoa
            </DialogTitle>

            <DialogContent className={styles.modalContent}>
                <TextField
                    label="Nome"
                    fullWidth
                    margin="normal"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />

                <TextField
                    label="Idade"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={form.age}
                    inputProps={{ min: 0 }}
                    error={!!error}
                    helperText={error}
                    onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value));
                        handleChange("age", value);
                        setError(null);
                    }}
                />
            </DialogContent>

            <DialogActions className={styles.modalActions}>
                <Button className={styles.cancelButton} onClick={onClose}>
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