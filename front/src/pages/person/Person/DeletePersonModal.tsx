import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from "@mui/material";
import styles from "./styles.module.css";

type DeletePersonModalProps = {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    personName?: string;
};

export default function DeletePersonModal({
    open,
    onClose,
    onDelete,
    personName,
}: DeletePersonModalProps) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle className={styles.modalTitle}>
                Deletar Pessoa
            </DialogTitle>

            <DialogContent>
                <Typography
                    className={styles.modalContent}
                    align="center"
                    component="p"
                >
                    Tem certeza que deseja deletar{" "}
                    <strong>{personName || "esta pessoa"}</strong>?
                </Typography>
            </DialogContent>

            <DialogActions className={styles.modalActions}>
                <Button className={styles.cancelButton} onClick={onClose}>
                    Cancelar
                </Button>

                <Button
                    className={styles.saveButton}
                    variant="contained"
                    color="error"
                    onClick={onDelete}
                    disabled={!personName}
                >
                    Deletar
                </Button>
            </DialogActions>
        </Dialog>
    );
}