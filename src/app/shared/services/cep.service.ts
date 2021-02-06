import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  consultarCep(cep: string): Observable<any> {
    cep = cep.replace(/\D/g, '');

    if (cep !== '') {

      const validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {

        return this.http.get(`//viacep.com.br/ws/${cep}/json`);

      }
    }
  }
}
