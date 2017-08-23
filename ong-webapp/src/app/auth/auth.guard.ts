import { AuthService } from './../api/auth.service';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {

    return this.checkAccess(state.url);
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    return this.checkAccess(null);
  }

  private checkAccess(next: string){
    if (this.authService.isAuthenticated()){
      return true;
    }

    if (next){
      this.router.navigate(['/login'], {queryParams: {next: next}});
    }else{
      this.router.navigate(['/login']);
    }

    return false;
  }
}
