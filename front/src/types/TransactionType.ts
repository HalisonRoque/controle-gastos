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

export type CreateTransactionDTO = {
    description: string;
    type: string;
    value: number;
    personId: number;
    categoryId: number;
}
