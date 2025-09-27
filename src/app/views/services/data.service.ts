import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../auth/users.model';

@Injectable()
export class DataService {
  private tokenSubject: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private currentUserSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(<User>{});
  private actionSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);


  constructor() {
  }

  setUser(user: User) {
    this.currentUserSubject.next(user);
    sessionStorage.setItem('u', JSON.stringify(user));
  }


  getToken(): string | undefined {
    if (this.tokenSubject.getValue()) {
      return this.tokenSubject.getValue();
    } else {
      const t = sessionStorage.getItem('t') ?? undefined;
      this.tokenSubject.next(t);
      return t;
    }
  }


  setToken(token: string) {
    this.tokenSubject.next(token);
    sessionStorage.setItem('t', token);
  }



  logout() {
    this.currentUserSubject.next(undefined);
    this.tokenSubject.next(undefined);
    this.actionSubject.next(0);
    sessionStorage.removeItem('t');
    sessionStorage.removeItem('l');
    sessionStorage.removeItem('u');
    sessionStorage.clear();
  }


}
