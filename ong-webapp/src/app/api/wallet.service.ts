import { ApiConfig } from './api.config';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Wallet } from './../wallet/wallet';

@Injectable()
export class WalletService {

  constructor(
    private http: Http
  ) { }

  getWallets(): Promise<Wallet[]>{
    return this.http.get(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}${ApiConfig.walletList}`, ApiConfig.getOptions())
      .toPromise()
      .then(resp => {
        return  resp.json() as Wallet[];
      })
      .catch(resp => {
        return resp.json.data as Wallet[];
      })
  }
}
