import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  // currentUser;
  token?: string;
  roles?: any[];

  constructor(private router: Router, private dataStore: DataService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = this.dataStore.getToken();


    const jwtHelper: JwtHelperService = new JwtHelperService();
    // console.log('AuthGuard: Token is expired: ' + jwtHelper.isTokenExpired(this.token));
    if (this.token && !jwtHelper.isTokenExpired(this.token)) {
      return true;
    } else {
      return this.refreshToken(state);

      }
    }

  // not logged in so redirect to login page
  refreshToken(state: RouterStateSnapshot) {
    return this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}, replaceUrl: true})
      .then(nav => {
        return nav;
      });
  }

}
