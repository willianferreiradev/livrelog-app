import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseForm } from 'src/app/shared/helpers/BaseForm';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
})
export class Step1Component extends BaseForm implements OnInit {
  @Input() budget: { date: string };
  @Output() nextStep = new EventEmitter<{ date: string }>();
  @Output() prevStep = new EventEmitter(null);

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    if (this.budget?.date) {
      const date = (new Date(this.budget.date)).toISOString();
      this.form.patchValue({ date });
    }
  }

  prev() {
    this.prevStep.emit();
  }

  createForm() {
    this.form = this.formBuilder.group({
      date: [null, Validators.required]
    });
  }

  submit() {
    const date: string = (new Date(this.formValue.date))
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    this.nextStep.emit({ date });
  }
}
