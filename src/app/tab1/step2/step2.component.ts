import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ColorEnum } from 'src/app/shared/enums/Color';
import { BaseForm } from 'src/app/shared/helpers/BaseForm';
import { Budget } from 'src/app/shared/models/Budget';
import { CepService } from 'src/app/shared/services/cep.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component extends BaseForm implements OnInit {
  @Input() budget: Budget;
  @Output() nextStep = new EventEmitter<string>();
  @Output() prevStep = new EventEmitter(null);

  fields = [
    { label: 'CEP', name: 'cep', color: ColorEnum.LIGHT, type: 'text', mask: '00000-000', placeholder: '' },
    { label: 'Rua', name: 'street', color: ColorEnum.LIGHT, type: 'text', placeholder: '' },
    { label: 'Número', name: 'number', color: ColorEnum.LIGHT, type: 'text', placeholder: 'Caso sem Número: SN' },
    { label: 'Complemento', name: 'complement', color: ColorEnum.LIGHT, type: 'text' , placeholder: ''},
    { label: 'Bairro', name: 'neighborhood', color: ColorEnum.LIGHT, type: 'text', placeholder: '' },
    { label: 'Cidade', name: 'city', color: ColorEnum.LIGHT, type: 'text', placeholder: '' },
    { label: 'Estado (UF)', name: 'state', color: ColorEnum.LIGHT, type: 'text', placeholder: '' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private cepService: CepService
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.form.patchValue(this.budget);
    this.searchByCep('origin');
    this.searchByCep('destination');
  }

  createForm( ) {
    this.form = this.formBuilder.group({
      origin: this.getAddressForm(),
      destination: this.getAddressForm()
    });
  }

  submit() {
    this.nextStep.emit(this.formRawValue);
  }

  prev() {
    this.prevStep.emit(this.formRawValue);
  }

  private getAddressForm(): FormGroup {
    const value = { value: null, disabled: true };
    return this.formBuilder.group({
      cep: [null, Validators.required],
      street: [null],
      complement: [null],
      neighborhood: [null],
      city: [value, Validators.required],
      state: [value, Validators.required],
      number: [null, Validators.required]
    });
  }

  private searchByCep(field: string): void {
    this.form.get(`${field}.cep`).statusChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultarCep(this.form.get(`${field}.cep`).value)
          : new Observable(null))
      )
      .subscribe(
        data => data ? this.populateCep(data, field) : this.populateCep(null, field),
        () => this.populateCep(null, field)
      );
  }

  populateCep(data: any, field: string): void {
    this.form.get(field).patchValue({
      street: data ? data.logradouro : null,
      neighborhood: data ? data.bairro : null,
      city: data ? data.localidade : null,
      state: data ? data.uf : null,
    });
  }
}
