import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';

// import { AuthenticationService } from '@services/authentication.service';
// import { LoaderService } from '@services/loader.service';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
// import { showToastError } from '@shared/helpers/toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loadingConfig = { message: 'Carregando...' };
    return from(this.loadingController.create(loadingConfig)).pipe(
      tap(loading => loading.present()),
      switchMap(loading => {
        return next.handle(request).pipe(
          catchError(({ error: { message = 'Ocorreu algum erro inesperado!', errors = null } }) => {

            if (errors) {
              message = Object.keys(errors).map(key => {
                return errors[key];
              }).join('<br> ');
            }

            this.alertController.create({
              message,
              buttons: ['OK']
            }).then(alert => alert.present());
            return of(null);
          }),
          finalize(() => loading.dismiss())
        );
      })
    );


    this.loadingController.create({
      message: 'Carregando...'
    }).then(loading => loading.present());
    // this.loadeService.show();
    // const currentUser: any = this.authenticationService.currentUserValue;
    // if (currentUser && currentUser.access_token && !request.url.includes('viacep')) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${currentUser?.access_token}`
    //     }
    //   });
    // }

    return next.handle(request).pipe(
    //   catchError(() => {
        // if (message === 'User not actived') {
        //   showToastError('Seu usuário não foi ativado.', 'Ops...');
        //   return of(null);
        // }

        // if (message === 'Unauthorized') {
        //   showToastError('Email ou senha incorretos.', 'Ops...');
        //   return of(null);
        // }

        // showToastError('Ocorreu um erro na requisição', 'Ops...');
      //   return of(null);
      // }),
      finalize(() => this.loadingController.dismiss())
    );
  }
}
