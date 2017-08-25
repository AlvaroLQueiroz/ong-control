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

  setTransactionCategory(wallet: TransactionCategory): Promise<TransactionCategory>{
    if (wallet.id){
      return this.updateTransactionCategory(wallet);
    }else{
      return this.createTransactionCategory(wallet);
    }
  }

  updateTransactionCategory(wallet: TransactionCategory): Promise<TransactionCategory> {
    return this.http
      .put(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.updateTransactionCategory(wallet.id)}`,
        JSON.stringify(wallet),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }

  createTransactionCategory(wallet: TransactionCategory): Promise<TransactionCategory> {
    return this.http
      .post(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.createTransactionCategory}`,
        JSON.stringify(wallet),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }
}
