import { Subscription } from 'rxjs/Rx';
import { User, Login } from './../../api/user';
import { ApiService } from '../../api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  login: Login;
  next: string;
  hasError: boolean;
  apiSubscription: Subscription;
  submmited: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.login = new Login();
    this.next = '';
    this.hasError = false;
    this.submmited = false;
  }

  ngOnInit() {
    this.next = this.route.snapshot.queryParams['next'] || 'home';
    this.apiSubscription = this.apiService.isAuthenticated.subscribe(isAuthenticated => {
      if(isAuthenticated){
        this.router.navigate([this.next]);
      }else{
        this.hasError = true;
      }
    });
  }

  submit() {
    this.apiService.authenticate(this.login);
    this.submmited = true;
  }

  ngOnDestroy(){
    this.apiSubscription.unsubscribe();
  }
}
