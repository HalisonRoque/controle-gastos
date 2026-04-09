import api from "./api";
import type { CategoryType } from "../src/types/CategoryType";

/*Métodos criados para acessar os endpois dos controllers importando api do axios*/

// Listar todos
export const getCategory = async (purpose?: string): Promise<CategoryType[]> => {
    const { data } = await api.get("/api/category/all", {
        params: { purpose },
    });
    return data;
};

// Criar
export const createCategory = async (purpose: Omit<CategoryType, "id">): Promise<CategoryType> => {
    const { data } = await api.post("/api/category/create", purpose);
    return data;
};