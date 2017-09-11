import { Wallet } from './../wallet/wallet';
import { TransactionCategory } from './../transaction-category/transaction-category';

export class Transaction {
  id: number;
  active: boolean;
  description: string;
  done: boolean;
  due_date: string;
  value: number;
  operation_number: string;

  category: TransactionCategory;
  wallet: Wallet;
}
