import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from './components/control-error/control-error.component';



@NgModule({
  declarations: [ControlErrorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ControlErrorComponent]
})
export class SharedModule { }
