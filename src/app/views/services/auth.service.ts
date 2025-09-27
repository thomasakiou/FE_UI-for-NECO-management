import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import {Endpoints} from '../../endpoints';
import {DataService} from './data.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../auth/users.model';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(<User>{});
  public currentUser: Observable<User> = this.currentUserSubject.asObservable();
  // private apiUrl = Endpoints.remoteUrl + Endpoints.apiUrl + '/auth';

  constructor(private http: HttpClient, private dataStore: DataService, private router: Router) {
  }


  private apiUrl = 'http://api.manager.local/iam/api/v1/auth'; // adjust to your backend


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }


  clearToken() {
    this.dataStore.logout();
    this.currentUserSubject.next({});
    this.router.navigate(['/login'], { replaceUrl: true }); // ✅ history reset
  }



  logout(nav = false) {
    // remove user from local storage to log user out
    if (this.tokenExpired() && !nav) {
      this.clearToken();
    } else {
      this.http.get(this.apiUrl + '/logout').pipe(first()).subscribe(s => {
        this.dataStore.logout();
        this.currentUserSubject.next({});

        if (nav) {
          this.router.navigate(['/login'], { replaceUrl: true }); // ✅ prevent back button
        }
      }, error => {
        this.dataStore.logout();
        this.currentUserSubject.next({});

        if (nav) {
          this.router.navigate(['/login'], { replaceUrl: true }); // ✅ even on error
        }
      });
    }
  }


  tokenExpired(): boolean {
    const jwtHelper: JwtHelperService = new JwtHelperService();
    // console.log(this.dataStore.getToken());
    if (jwtHelper.isTokenExpired(this.dataStore.getToken() ?? '')) {
      this.dataStore.logout();
      return true;
    }

    return false;
  }
}
