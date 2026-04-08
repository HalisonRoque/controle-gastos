export type TransactionType = {
    id: number;
    name: string;
    description: string;
    value: number;
    type: string;
    category: string;
    person: string;
    personId: number;
};

export type CreateTransactionDTO = {
    description: string;
    type: string;
    value: number;
    personId: number;
    categoryId: number;
}

export type PersonBalanceType = {
    personId: number;
    personName: string;
    totalIncome: number;
    totalExpenses: number;
    totalItem: number;
    balance: number;
};
