import { Observable } from 'rxjs/Rx';
import { RequestOptions, Headers, Http, RequestMethod, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {
  private _body: any = null;
  private _endpoints = null;
  private _options: {} = null;
  private _params: any[] = null;
  private _qParams: string = null;

  constructor(private http: Http) {
    this._params = [];
    this._qParams = '';
    this._options = {
      headers: new Headers({
        Authorization: 'Token ' + this.getToken(),
        'Content-type': 'application/json'
      })
    };
    this._endpoints = {
      // #################### AUTH ####################
      auth: () => '/api-token-auth/',
      // #################### WALLETS ####################
      listWallets: () => '/wallets/',
      createWallet: () => '/wallets/',
      getWallet: (id: number) => `/wallets/${id}/`,
      updateWallet: (id: number) => `/wallets/${id}/`,

      // #################### TRANSACTIONS CATEGORY ###########
      listTransactionCategory: () => '/transaction-category/',
      createTransactionCategory: () => '/transaction-category/',
      getTransactionCategory: (id: number) => `/transaction-category/${id}/`,
      updateTransactionCategory: (id: number) => `/transaction-category/${id}/`,

      // #################### TRANSACTIONS ####################
      listTransactions: () => '/transactions/',
      createTransaction: () => '/transactions/add/',
      listWalletTransactions: (id: number) => `/transactions/wallet/${id}/`,
      listCategoryTransactions: (id: number) => `/transactions/category/${id}/`,
      getTransaction: (id: number) => `/transactions/${id}/`,
      updateTransaction: (id: number) => `/transactions/${id}/update/`
    };
  }

  setToken(token: string): void {
    localStorage.setItem('userToken', token);
  }

  getToken(): string {
    return localStorage.getItem('userToken');
  }

  authenticate(token: string): void {
    this.setToken(token);
    localStorage.setItem('isAuthenticated', 'true');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  logout(): void {
    localStorage.setItem('userToken', '');
    localStorage.setItem('isAuthenticated', 'false');
  }

  requestOptions(opt: {}): ApiService {
    this._options = Object.assign(this._options, opt);
    return this;
  }

  data(body: any): ApiService {
    this._body = body;
    return this;
  }

  params(...parameters: any[]): ApiService {
    this._params = parameters;
    return this;
  }

  queryParams(qParams: {}): ApiService {
    this._qParams = Object.keys(qParams)
      .map(key => `${key}=${qParams[key]}`)
      .join('&');
    return this;
  }

  url(endpoint: string): string {
    return `${environment.apiAddress}:${environment.apiPort}${this._endpoints[endpoint](
      this._params
    )}?${this._qParams}`;
  }

  getRequestOptions(method: RequestMethod | string | null): RequestOptions {
    const opts = {
      method: method,
      body: this._body
    };
    return new RequestOptions(Object.assign(opts, this._options));
  }

  resolver(endpoint: string, method?: RequestMethod | string | null): Observable<Response> {
    console.log(this.url(endpoint));
    return this.http.request(this.url(endpoint), this.getRequestOptions(method));
  }

  delete(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'delete');
  }

  get(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'get');
  }

  head(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'head');
  }

  options(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'options');
  }

  patch(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'patch');
  }

  post(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'post');
  }

  put(endpoint: string): Observable<Response> {
    return this.resolver(endpoint, 'put');
  }
}
