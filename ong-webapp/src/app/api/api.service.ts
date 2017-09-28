import { Profile } from './profile';
import { environment } from './../../environments/environment';
import { User, Login } from './user';
import { Observable } from 'rxjs/Rx';
import { RequestOptions, Headers, Http, RequestMethod, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ApiService {
  private _body: any = null;
  private _endpoints = null;
  private _options: {} = null;
  private _params: any[] = null;
  private _qParams: string = null;
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: Http) {
    this._params = [];
    this._qParams = '';
    this._options = {
      headers: new Headers({
        Authorization: 'Token ' + this.getToken(),
        'Content-type': 'application/json'
      })
    };
    this.isAuthenticated.next(localStorage.getItem('user') !== null);
    this._endpoints = {
      // #################### AUTH ####################

      login: () => '/api-token-auth/',
      // #################### WALLETS ####################
      listWallets: () => '/wallets/',
      createWallet: () => '/wallets/',
      getWallet: (id: number) => `/wallets/${id}/`,
      updateWallet: (id: number) => `/wallets/${id}/`,
      exportWallets: () => `/wallets/csv/`,

      // #################### TRANSACTIONS CATEGORY ###########
      listTransactionCategory: () => '/transaction-category/',
      createTransactionCategory: () => '/transaction-category/',
      getTransactionCategory: (id: number) => `/transaction-category/${id}/`,
      updateTransactionCategory: (id: number) => `/transaction-category/${id}/`,
      exportTransactionsCategories: () => `/transaction-category/csv/`,

      // #################### TRANSACTIONS ####################
      listTransactions: () => '/transactions/',
      createTransaction: () => '/transactions/',
      listWalletTransactions: (id: number) => `/transactions/wallet/${id}/`,
      listCategoryTransactions: (id: number) => `/transactions/category/${id}/`,
      getTransaction: (id: number) => `/transactions/${id}/`,
      updateTransaction: (id: number) => `/transactions/${id}/`,
      exportTransactions: () => `/transactions/csv/`,
      chartTransactions: () => `/transactions/chart/`,

      // #################### COLLABORATORS ####################
      listCollaborators: () => '/collaborators/',
      createCollaborator: () => '/collaborators/',
      getCollaborator: (id: number) => `/collaborators/${id}/`,
      updateCollaborator: (id: number) => `/collaborators/${id}/`,
      exportCollaborators: () => `/collaborators/csv/`,

      // #################### BENEFICIARY ####################
      listBeneficiaries: () => '/profiles/',
      createBeneficiary: () => '/profiles/',
      getBeneficiary: (id: number) => `/profiles/${id}/`,
      updateBeneficiary: (id: number) => `/profiles/${id}/`,
      exportBeneficiaries: () => `/profiles/csv/`,
    };
  }

  authenticate(login: Login) {
    this.http
      .post(this.url('login'), login)
      .toPromise()
      .then(resp => {
        localStorage.setItem('user', resp.text());
        this.isAuthenticated.next(true);
      })
      .catch(resp => {
        this.isAuthenticated.next(false);
      });
  }

  getToken(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}') as Profile;
    if (user) {
      if (user.user) {
        if (user.user.auth_token) {
          return user.user.auth_token;
        }
        }
    }
    return '';
  }

  getUser(): Profile {
    return JSON.parse(localStorage.getItem('user') || '{}') as Profile;
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
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
    return `${environment.apiAddress}:${environment.apiPort}${environment.postfix}${this._endpoints[endpoint](
      this._params
    )}` + (this._qParams ? `?${this._qParams}` : '');
  }

  getRequestOptions(method: RequestMethod | string | null): RequestOptions {
    const opts = {
      method: method,
      body: this._body
    };
    return new RequestOptions(Object.assign(opts, this._options));
  }

  resolver(endpoint: string, method?: RequestMethod | string | null): Observable<Response> {
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
