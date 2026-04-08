import api from "./api";
import type { CreateTransactionDTO, TransactionType } from "../src/types/TransactionType";

// Listar todos
export const getTransaction = async (name?: string): Promise<TransactionType[]> => {
    const { data } = await api.get("/api/transaction/all", {
        params: { name },
    });
    return data;
};

// Criar
export const createTransaction = async (transaction: Omit<CreateTransactionDTO, "id">): Promise<CreateTransactionDTO> => {
    const { data } = await api.post("/api/transaction/create", transaction);
    return data;
};