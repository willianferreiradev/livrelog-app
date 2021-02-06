import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private storage: Storage,
    private router: Router,
    private auth: AuthService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.hasAccessTokenObservable();
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.hasAccessTokenObservable();
  }

  private hasAccessTokenObservable(): Observable<boolean> {
    return from(this.storage.get('currentUser')).pipe(
      map(user => JSON.parse(user)),
      tap(user => {
        if (user) {
          this.auth.currentUserSubject.next(user);
        }
      }),
      map(user => user ? user : { access_token: null }),
      map(({ access_token }) => {
        if (!access_token) this.router.navigate(['auth', 'login']);
        return !!access_token;
      })
    );
  }
}
