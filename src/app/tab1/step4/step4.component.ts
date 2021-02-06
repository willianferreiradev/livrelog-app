import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from 'src/app/shared/helpers/BaseForm';
import { Budget } from 'src/app/shared/models/Budget';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component extends BaseForm implements OnInit {
  @Input() budget: Budget;
  @Output() nextStep = new EventEmitter<{ date: string }>();
  @Output() prevStep = new EventEmitter(null);

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    if (this.budget) this.form.patchValue(this.budget);
  }

  prev() {
    this.prevStep.emit(this.formRawValue);
  }

  createForm() {
    this.form = this.formBuilder.group({
      inventory: [null, Validators.required],
      comments: [null]
    });
  }

  submit() {
    this.nextStep.emit(this.formValue);
  }
}
