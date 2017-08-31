import { ApiService } from './../api/api.service';
import { Observable, Subscription } from 'rxjs/Rx';
import { Injectable, OnDestroy } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad{
  apiSubscription: Subscription;
  constructor(private apiService: ApiService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.checkAccess(state.url);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAccess(null);
  }

  private checkAccess(next: string) {
    let hasAccess = false;
    this.apiSubscription = this.apiService.isAuthenticated.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        hasAccess = true;
      } else if (next) {
        this.router.navigate(['/login'], { queryParams: { next: next } });
      } else {
        this.router.navigate(['/login']);
      }
    });
    return hasAccess;
  }
  ngOnDestroy(){
    this.apiSubscription.unsubscribe();
  }
}
