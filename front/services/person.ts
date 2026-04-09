import api from "./api";
import type { PersonType } from "../src/types/PersonType";

/*Métodos criados para acessar os endpois dos controllers importando api do axios*/

// Listar todos
export const getPersons = async (name?: string): Promise<PersonType[]> => {
    const { data } = await api.get("/api/person/all", {
        params: { name },
    });
    return data;
};

// Criar
export const createPerson = async (person: Omit<PersonType, "id">): Promise<PersonType> => {
    const { data } = await api.post("/api/person/create", person);
    return data;
};

// Atualizar
export const updatePerson = async (person: PersonType): Promise<PersonType> => {
    const { data } = await api.put(`/api/person/${person.id}`, person);
    return data;
};

// Deletar
export const deletePerson = async (id: number): Promise<void> => {
    await api.delete(`/api/person/${id}`);
};