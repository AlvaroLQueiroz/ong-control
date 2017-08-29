import { PaginationService } from "./pagination.service";
import { ApiService } from "./api.service";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/toPromise";

import { Wallet } from "./../wallet/wallet";

@Injectable()
export class WalletService {
  constructor(
    private http: Http,
    private apiService: ApiService,
    private paginationService: PaginationService
  ) {}

  getWallets(queryParams?: {}): Promise<Wallet[]> {
    return this.apiService.get("listWallets").toPromise().then(resp => {
      let response = resp.json();
      this.paginationService.sendMessage(response.pages);
      return response.results as Wallet[];
    });
  }

  getWallet(id: number): Promise<Wallet> {
    return this.apiService
      .params(id)
      .get("getWallet")
      .toPromise()
      .then(resp => {
        return resp.json() as Wallet;
      });
  }

  setWallet(wallet: Wallet): Promise<Wallet> {
    if (wallet.id) {
      return this.updateWallet(wallet);
    } else {
      return this.createWallet(wallet);
    }
  }

  updateWallet(wallet: Wallet): Promise<Wallet> {
    return this.apiService
      .params(wallet.id)
      .data(wallet)
      .put("updateWallet")
      .toPromise()
      .then(resp => resp.json());
  }

  createWallet(wallet: Wallet): Promise<Wallet> {
    return this.apiService
      .data(wallet)
      .post("createWallet")
      .toPromise()
      .then(resp => resp.json());
  }
}
