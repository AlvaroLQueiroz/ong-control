import { Headers, RequestOptions } from '@angular/http'

export class ApiConfig {
    public static apiAddress = 'http://10.0.75.1'
    public static apiPort = '8000'

    public static walletList = '/wallets/'

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
      let headers = new Headers({'Authorization': 'Token ' + this.getToken()})
      let options = new RequestOptions({headers: headers})
      return options;
    }
}
