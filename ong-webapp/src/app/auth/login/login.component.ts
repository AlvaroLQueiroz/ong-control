import { AuthService } from './../../api/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Login } from './login';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: Login = {
    username: null,
    password: null
  };
  loginSubscription: Subscription = null;
  next: string = null;
  hasError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.next = this.route.snapshot.queryParams['next'] || 'home';
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  submit() {
    this.loginSubscription = this.authService.login(this.user).subscribe(
      resp => {
        this.hasError = false;
        this.router.navigate([this.next]);
      },
      resp => {
        this.hasError = true;
      }
    );
  }
}
