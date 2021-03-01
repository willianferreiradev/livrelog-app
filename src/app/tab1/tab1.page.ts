import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CreateBudgetComponent } from './create-budget/create-budget.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private modalController: ModalController
  ) { }

  async click() {
    const modal = await this.modalController.create({
      component: CreateBudgetComponent,
    });
    return await modal.present();
  }
}
