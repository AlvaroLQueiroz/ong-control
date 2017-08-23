import { Login } from './../auth/login/login';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map'
import { ApiConfig } from './api.config';

@Injectable()
export class AuthService {

  private _isAuthenticated: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  login(user: Login) {
    return this.http.post(`${ApiConfig.apiAddress}:${ApiConfig.apiPort}/api-token-auth/`, user)
      .map(resp => {
        var response = resp.json()
        if (response.token) {
          ApiConfig.authenticate(response.token);
          this.showMenuEmitter.emit(true);
        } else {
          ApiConfig.logout()
          this.showMenuEmitter.emit(false);
        }
        return response;
      })
  }

  logout() {
    ApiConfig.logout();
    this.router.navigate(['/login']);
    this.showMenuEmitter.emit(false);
  }

  isAuthenticated() {
    return ApiConfig.isAuthenticated();
  }
}
