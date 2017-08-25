import { ApiConfig } from "./api.config";
import { Http } from "@angular/http";
import { Transaction } from "./../transaction/transaction";
import { Injectable } from "@angular/core";

@Injectable()
export class TransactionService {

  constructor(
    private http: Http
  ) {}

  listTransactions(): Promise<Transaction[]> {
    return this.http.get(
      `${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.listTransactions}`,
      ApiConfig.getOptions()
    )
    .toPromise()
    .then(resp => {
      return resp.json() as Transaction[];
    });
  }

  listWalletTransactions(walletId: number): Promise<Transaction[]> {
    return this.http.get(
        `${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.listWalletTransactions(walletId)}`,
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => {
        return resp.json() as Transaction[];
      });
  }

  getTransaction(id: number): Promise<Transaction> {
    return this.http
      .get(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.getTransaction(id)}`,
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => {
        return resp.json() as Transaction;
      });
  }

  setTransaction(transaction: Transaction): Promise<Transaction>{
    if (transaction.id){
      return this.updateTransaction(transaction);
    }else{
      return this.createTransaction(transaction);
    }
  }

  updateTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http
      .put(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.updateTransaction(transaction.id)}`,
        JSON.stringify(transaction),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }

  createTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http
      .post(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.createTransaction}`,
        JSON.stringify(transaction),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }
}
