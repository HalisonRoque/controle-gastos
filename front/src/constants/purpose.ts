/*Constantes usadas para tipagem de Receitas  e Despesas */

export const PURPOSE_OPTIONS = ["Receita", "Despesa"] as const;

export type PurposeType = typeof PURPOSE_OPTIONS[number];