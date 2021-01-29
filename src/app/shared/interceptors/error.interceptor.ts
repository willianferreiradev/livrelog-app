// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
// } from '@angular/common/http';
// import { AuthenticationService } from '../services/authentication.service';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private authenticationService: AuthenticationService,
//     private router: Router) { }

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(
//       catchError((err) => {
//         // tslint:disable-next-line: triple-equals
//         if (err.status == 401) {
//           this.authenticationService.logout();
//           // tslint:disable-next-line: deprecation
//           this.router.navigate(['auth', 'login']);
//         }

//         const error = err.error.message || err.statusText;
//         return throwError(error);
//       })
//     );
//   }
// }
