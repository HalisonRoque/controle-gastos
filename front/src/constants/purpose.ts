export const PURPOSE_OPTIONS = ["Receita", "Despesa", "Ambas"] as const;

export type PurposeType = typeof PURPOSE_OPTIONS[number];