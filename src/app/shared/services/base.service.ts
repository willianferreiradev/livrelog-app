import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Budget } from '../models/Budget';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  constructor(protected http: HttpClient, protected API: string) { }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.API).pipe(take(1));
  }

  loadById(id: number): Observable<T> {
    return this.http.get<T>(`${this.API}${id}`).pipe(take(1));
  }

  save(model: any): Observable<T> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.API}${id}`);
  }

  private create(model: T): Observable<T> {
    return this.http.post<T>(this.API, model);
  }

  private update(model: any): Observable<T> {
    return this.http.put<T>(`${this.API}${model.id}`, model);
  }

}
