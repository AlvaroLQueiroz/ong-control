import { ApiConfig } from "./api.config";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";

import "rxjs/add/operator/toPromise";

import { Wallet } from "./../wallet/wallet";

@Injectable()
export class WalletService {
  constructor(private http: Http) {}

  getWallets(): Promise<Wallet[]> {
    return this.http
      .get(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.listWallets}`,
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => {
        return resp.json() as Wallet[];
      });
  }

  getWallet(id: number): Promise<Wallet> {
    return this.http
      .get(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.getWallet(id)}`,
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => {
        return resp.json() as Wallet;
      });
  }

  setWallet(wallet: Wallet): Promise<Wallet>{
    if (wallet.id){
      return this.updateWallet(wallet);
    }else{
      return this.createWallet(wallet);
    }
  }

  updateWallet(wallet: Wallet): Promise<Wallet> {
    return this.http
      .put(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.updateWallet(wallet.id)}`,
        JSON.stringify(wallet),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }

  createWallet(wallet: Wallet): Promise<Wallet> {
    return this.http
      .post(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.createWallet}`,
        JSON.stringify(wallet),
        ApiConfig.getOptions()
      )
      .toPromise()
      .then(resp => resp.json());
  }
}
