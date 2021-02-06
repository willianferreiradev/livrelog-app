import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginData } from '../shared/models/login-data';
import { User } from '../shared/models/user';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = `${environment.api}auth/`;
  currentUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private storage: Storage
  ) {
    this.storage.get('currentUser').then(user => this.currentUserSubject.next(JSON.parse(user)));
  }

  login(loginData: LoginData): Observable<User> {
    return this.http.post<User>(`${this.API}login`, loginData)
      .pipe(
        switchMap(user => from(this.storage.set('currentUser', JSON.stringify(user)))),
        map(user => {
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

}
