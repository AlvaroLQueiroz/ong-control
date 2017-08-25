import { Headers, RequestOptions } from '@angular/http'

export class ApiConfig {
    public static apiAddress = 'http://10.0.75.1';
    public static apiPort = '8000';

    // #################### WALLETS ####################
    public static listWallets = '/wallets/';
    public static getWallet(id: number): string{
      return `/wallets/${id}/`;
    }
    public static createWallet = '/wallets/';
    public static updateWallet(id: number): string{
      return `/wallets/${id}/`;
    }

    // #################### TRANSACTIONS ####################
    public static listTransactions = '/transactions/';
    public static listWalletTransactions(id: number): string{
      return `/transactions/wallet/${id}/`;
    }
    public static getTransaction(id: number): string{
      return `/transactions/${id}/`;
    }




    public static setToken(token: string){
      localStorage.setItem('userToken', token);
    }

    public static getToken(){
      return localStorage.getItem('userToken');
    }

    public static authenticate(token: string){
      this.setToken(token);
      localStorage.setItem('isAuthenticated', 'true');
    }

    public static isAuthenticated(){
      return localStorage.getItem('isAuthenticated') === 'true';
    }

    public static logout(){
      localStorage.setItem('userToken', '');
      localStorage.setItem('isAuthenticated', 'false');
    }

    public static getOptions(){
      let headers = new Headers({'Authorization': 'Token ' + this.getToken(), 'Content-type': 'application/json'})
      let options = new RequestOptions({headers: headers})
      return options;
    }
}
