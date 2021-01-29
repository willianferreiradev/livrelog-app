import { FormArray, FormControl } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1): unknown {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };

    };
    return validator;
  }

  static cepValidator(control: FormControl): unknown {
    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherField: string): unknown {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo');
      }

      // Mudar esse any
      if (!formControl.root || !(formControl.root as any).controls) {
        return null;
      }

      const field = (formControl.root as FormControl).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um válido');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };

    return validator;
  }

  static getErrorMessage(fieldName: string, validatorName: string, fieldValue?: any): string {

    const config = {
      required: `${fieldName} é obrigatório.`,
      email: `${fieldName} precisa conter @dominio.com.`,
      minlength: `${fieldName} precisa ter no mínimo ${fieldValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${fieldValue.requiredLength} caracteres.`,
      cepInvalido: 'CEP Inválido.'
    };

    return config[validatorName];
  }
}
