import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';

import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { Step4Component } from './step4/step4.component';
import { Step5Component } from './step5/step5.component';
import { SharedModule } from '../shared/shared.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule
  ],
  declarations: [
    Tab1Page,
    CreateBudgetComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
  ],
  entryComponents: [CreateBudgetComponent]
})
export class Tab1PageModule {}
