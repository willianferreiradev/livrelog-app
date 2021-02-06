import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Budget } from '../models/Budget';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService extends BaseService<Budget> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.api}budgets/`);
  }
}
