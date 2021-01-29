import { FormArray, FormGroup } from '@angular/forms';
import { ColorEnum } from '../enums/Color';
import { Field } from '../models/field';

export abstract class BaseForm {
  form: FormGroup;
  colorFields = {};
  fields: Field[] = [];

  constructor() { }

  abstract submit(): void;

  abstract createForm(): void;

  setLabelColor(index: number): void {
    this.fields[index].color = this.labelColor(index);
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submit();
    } else {
      this.checkValidations(this.form);
    }
  }

  checkValidations(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsDirty();
      control.markAsTouched();
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.checkValidations(control);
      }
    });
  }

  reset(): void {
    this.form.reset();
  }


  checkIsValidTouched(field: string): boolean {
    return (
      !this.form.get(field).valid &&
      (this.form.get(field).touched || this.form.get(field).dirty)
    );
  }

  labelColor(index: number) {
    const hasError = this.checkIsValidTouched(this.fields[index].name);
    return !!hasError ? ColorEnum.DANGER : ColorEnum.LIGHT;
  }

  get formValue(): any {
    return this.form.value;
  }

  get formRawValue(): any {
    return this.form.getRawValue();
  }
}
