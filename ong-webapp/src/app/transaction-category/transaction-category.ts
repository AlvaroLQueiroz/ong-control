export class TransactionCategory {
  id: number;
  active: boolean;
  description: string;
  label: string;
  needs_nf: boolean;
  transaction_type: number;

  public static TRANSACTION_INPUT: number = 1;
  public static TRANSACTION_OUTPUT: number = 2;
}
