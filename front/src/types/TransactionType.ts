export type TransactionType = {
    id: number;
    nome: string;
    description: string;
    type: string;
    personId: number;
    categoryId: number;
    receita: number;
    despesa: number;
};