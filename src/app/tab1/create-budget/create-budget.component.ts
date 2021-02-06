import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AlertController, ModalController } from '@ionic/angular';

import { AuthService } from 'src/app/auth/auth.service';
import { Budget } from 'src/app/shared/models/Budget';
import { BudgetService } from 'src/app/shared/services/budget.service';
import { defaultAlertConfig } from 'src/app/shared/helpers/alert.helper';


@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss'],
})
export class CreateBudgetComponent implements OnInit {
  actualStep = 1;
  totalSteps = 5;
  budget: Budget;

  constructor(
    private modalController: ModalController,
    private budgetService: BudgetService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(
      switchMap(({ budget }) => budget ? this.budgetService.loadById(budget) : of(null)),
      tap(budget => this.budget = budget),
      switchMap(() => this.auth.currentUserSubject)
    ).subscribe(({ id }) => this.budget = { ...this.budget, client_id: id });
  }

  dismiss(): void {
    this.modalController.dismiss();
  }

  nextStep(partialBudget: Budget): void {
    this.budget = { ...this.budget, ...partialBudget };
    if (this.actualStep === 4) return this.save();

    this.actualStep++;
  }

  prevStep(partialBudget: Budget): void {
    this.budget = { ...this.budget, ...partialBudget };
    this.actualStep--;
  }

  get steps(): number[] {
    return Array.from({ length: this.totalSteps }, (_, i) => i + 1);
  }

  private save(): void {
    this.budgetService.save(this.budget).subscribe(async ({ id }) => {
      this.router.navigate([], { relativeTo: this.route, queryParams: { budget: id } });
      const alert = await this.alertController.create(defaultAlertConfig);
      alert.present();
      this.actualStep++;
    });
  }
}
