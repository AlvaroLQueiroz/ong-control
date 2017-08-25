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
}
