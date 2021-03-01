import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { from, Observable, of, throwError } from 'rxjs';

// import { AuthenticationService } from '@services/authentication.service';
// import { LoaderService } from '@services/loader.service';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { defaultAlertConfig } from '../helpers/alert.helper';
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
          switchMap(response => {
            if ((response as any)?.body?.erro) {
              return throwError({ error: { message: 'CEP não encontrado' } });
            }
            return of(response);
          }),
          catchError(({ error: { message = 'Ocorreu algum erro inesperado!', errors = null } }) => {
            if (errors) {
              message = this.getMessageForMultipleErrors(errors);
            }

            this.showAlert(message);
            return of(null);
          }),
          finalize(() => loading.dismiss())
        );
      })
    );
  }

  private getMessageForMultipleErrors(errors: unknown) {
    return Object.keys(errors).map(key => {
      return errors[key];
    }).join('<br> ');
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create(defaultAlertConfig(message));
    alert.present();
  }
}
