import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map'
import { Configs } from './configs';
import { Login } from './login';

@Injectable()
export class AuthService {

  private _isAuthenticated: boolean = false;
  private _userToken: string = null;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login(user: Login) {
    return this.http.post(`${Configs.apiAddress}:${Configs.apiPort}/api-token-auth/`, user)
      .map(resp => {
        var response = resp.json()
        if (response.token) {
          this._isAuthenticated = true;
          sessionStorage.setItem('isAuthenticated', 'true');
          sessionStorage.setItem('userToken', response.token);
          this._userToken = response.token;
          this.showMenuEmitter.emit(true);
        } else {
          sessionStorage.setItem('isAuthenticated', 'false');
          this.showMenuEmitter.emit(false);
        }
        return response;
      })
  }

  logout() {
    sessionStorage.setItem('isAuthenticated', 'false');
    sessionStorage.setItem('userToken', '');
    this.router.navigate(['/login']);
    this.showMenuEmitter.emit(false);
  }

  isAuthenticated() {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }

  getToken() {
    return sessionStorage.getItem('userToken');
  }
}
