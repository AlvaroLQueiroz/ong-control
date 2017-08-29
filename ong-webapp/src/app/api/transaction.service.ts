import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Transaction } from "./../transaction/transaction";
import { Injectable } from "@angular/core";

@Injectable()
export class TransactionService {
  constructor(private http: Http, private apiService: ApiService) {}

  listTransactions(): Promise<Transaction[]> {
    return this.apiService.get("listTransactions").toPromise().then(resp => {
      return resp.json() as Transaction[];
    });
  }

  listWalletTransactions(walletId: number): Promise<Transaction[]> {
    return this.apiService
      .params(walletId)
      .get("listWalletTransactions")
      .toPromise()
      .then(resp => {
        return resp.json() as Transaction[];
      });
  }

  listCategoryTransactions(categoryId: number): Promise<Transaction[]> {
    return this.apiService
      .params(categoryId)
      .get("listCategoryTransactions")
      .toPromise()
      .then(resp => {
        return resp.json() as Transaction[];
      });
  }

  getTransaction(id: number): Promise<Transaction> {
    return this.apiService
      .params(id)
      .get("getTransaction")
      .toPromise()
      .then(resp => {
        return resp.json() as Transaction;
      });
  }

  setTransaction(transaction: Transaction): Promise<Transaction> {
    if (transaction.id) {
      return this.updateTransaction(transaction);
    } else {
      return this.createTransaction(transaction);
    }
  }

  updateTransaction(transaction: Transaction): Promise<Transaction> {
    return this.apiService
      .params(transaction.id)
      .data(transaction)
      .put("updateTransaction")
      .toPromise()
      .then(resp => resp.json());
  }

  createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.apiService
      .data(transaction)
      .post("createTransaction")
      .toPromise()
      .then(resp => resp.json());
  }
}
