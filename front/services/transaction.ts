import api from "./api";
import type { CreateTransactionDTO, TransactionType } from "../src/types/TransactionType";

/*Métodos criados para acessar os endpois dos controllers importando api do axios*/

// Listar todos
export const getTransaction = async (person?: string): Promise<TransactionType[]> => {
    const { data } = await api.get("/api/transaction/all", {
        params: { person },
    });
    return data;
};

// Criar
export const createTransaction = async (
    transaction: Omit<CreateTransactionDTO, "id">): Promise<CreateTransactionDTO> => {
    const { data } = await api.post("/api/transaction/create", transaction);
    return data;
};

// Listar total de gastos por pessoa
export const getPersonBalance = async (
) => {
    const { data } = await api.get("/api/transaction/balance", {});
    return data;
};

// Listar total por categoria
export const getCategoryBalance = async (
) => {
    const { data } = await api.get("/api/transaction/balance/category", {});
    return data;
};
