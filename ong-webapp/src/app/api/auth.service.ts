import { ApiService } from './api.service';
import { Login } from './../auth/login/login';
import { Http } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private _isAuthenticated: boolean = false;

  showMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  login(user: Login) {
    return this.apiService
      .data(user)
      .get('auth')
      .map(resp => {
        const response = resp.json();
        if (response.token) {
          this.apiService.authenticate(response.token);
          this.showMenuEmitter.emit(true);
        } else {
          this.apiService.logout();
          this.showMenuEmitter.emit(false);
        }
        return response;
      });
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']);
    this.showMenuEmitter.emit(false);
  }

  isAuthenticated() {
    return this.apiService.isAuthenticated();
  }
}
