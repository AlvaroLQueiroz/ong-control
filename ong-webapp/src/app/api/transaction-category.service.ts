import { ApiService } from "./api.service";
import { TransactionCategory } from "./../transaction-category/transaction-category";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/toPromise";

@Injectable()
export class TransactionCategoryService {
  constructor(private http: Http, private apiService: ApiService) {}

  listTransactionCategory(): Promise<TransactionCategory[]> {
    return this.apiService
      .get("listTransactionCategory")
      .toPromise()
      .then(resp => {
        return resp.json() as TransactionCategory[];
      });
  }

  getTransactionCategory(id: number): Promise<TransactionCategory> {
    return this.apiService
      .params(id)
      .get("getTransactionCategory")
      .toPromise()
      .then(resp => {
        return resp.json() as TransactionCategory;
      });
  }

  setTransactionCategory(
    transaction: TransactionCategory
  ): Promise<TransactionCategory> {
    if (transaction.id) {
      return this.updateTransactionCategory(transaction);
    } else {
      return this.createTransactionCategory(transaction);
    }
  }

  updateTransactionCategory(
    transaction: TransactionCategory
  ): Promise<TransactionCategory> {
    return this.apiService
      .params(transaction.id)
      .data(transaction)
      .put("updateTransactionCategory")
      .toPromise()
      .then(resp => resp.json());
  }

  createTransactionCategory(
    transaction: TransactionCategory
  ): Promise<TransactionCategory> {
    return this.apiService
      .data(transaction)
      .post("createTransactionCategory")
      .toPromise()
      .then(resp => resp.json());
  }
}
