import { TransactionCategory } from './../transaction-category/transaction-category';
import { ApiConfig } from "./api.config";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/toPromise";


@Injectable()
export class TransactionCategoryService {
  constructor(private http: Http) {}

  listTransactionCategory(): Promise<TransactionCategory[]> {
    return this.http
      .get(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.listTransactionCategory}`,
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => {
        return resp.json() as TransactionCategory[];
      });
  }

  getTransactionCategory(id: number): Promise<TransactionCategory> {
    return this.http
      .get(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.getTransactionCategory(id)}`,
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => {
        return resp.json() as TransactionCategory;
      });
  }

  setTransactionCategory(transaction: TransactionCategory): Promise<TransactionCategory>{
    if (transaction.id){
      return this.updateTransactionCategory(transaction);
    }else{
      return this.createTransactionCategory(transaction);
    }
  }

  updateTransactionCategory(transaction: TransactionCategory): Promise<TransactionCategory> {
    return this.http
      .put(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.updateTransactionCategory(transaction.id)}`,
        JSON.stringify(transaction),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }

  createTransactionCategory(transaction: TransactionCategory): Promise<TransactionCategory> {
    return this.http
      .post(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.createTransactionCategory}`,
        JSON.stringify(transaction),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }
}
