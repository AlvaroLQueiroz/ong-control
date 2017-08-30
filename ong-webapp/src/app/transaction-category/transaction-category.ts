export enum TransactionType{
  'Entrada'= 1,
  'Saída'= 2,
}

export class TransactionCategory {
  id: number;
  active: boolean;
  description: string;
  label: string;
  needs_nf: boolean;
  transaction_type: TransactionType;
}

