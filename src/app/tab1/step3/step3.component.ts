import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ColorEnum } from 'src/app/shared/enums/Color';
import { BaseForm } from 'src/app/shared/helpers/BaseForm';
import { Budget } from 'src/app/shared/models/Budget';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component extends BaseForm implements OnInit {
  @Input() budget: Budget;
  @Output() nextStep = new EventEmitter<string>();
  @Output() prevStep = new EventEmitter(null);

  numberBedrooms = ['01', '02', '03', '04', '05', '+ de 05'];

  fields = [];

  customFields = [
    { label: 'Possui elevador', name: 'has_elevator' },
    { label: 'Possui escadas', name: 'has_stairs' },
    { label: 'Possui estacionamento', name: 'has_parking' },
    { label: 'Área de carga e descarga', name: 'has_loading_unloading_area' },
    { label: 'É condimínio fechado', name: 'is_closed_condominium' },
    { label: 'Possui restrição de horário', name: 'is_time_restriction' },
    { label: 'Móveis/Objetos', name: 'disassemble_furniture' },
    { label: 'Móveis/Objetos', name: 'pack_furniture' }
  ];

  constructor(
    private formBuilder: FormBuilder,
  ) {
    super();
  }

  ngOnInit() {
    this.createForm();
    this.form.patchValue(this.budget);
  }

  createForm() {
    this.form = this.formBuilder.group({
      withdrawal: this.getCharacteristicForm('withdrawal'),
      delivery: this.getCharacteristicForm('delivery'),
    });
  }

  submit() {
    this.nextStep.emit(this.formRawValue);
  }

  prev() {
    this.prevStep.emit(this.formRawValue);
  }

  private getCharacteristicForm(type: string): FormGroup {
    return this.formBuilder.group({
      type_building: [null, Validators.required],
      number_bedroom: [null, Validators.required],
      has_elevator: [false],
      has_stairs: [false],
      has_parking: [false],
      is_time_restriction: [false],
      has_loading_unloading_area: [false],
      is_closed_condominium: [false],
      disassemble_furniture: [false],
      pack_furniture: [false],
      type: [type, Validators.required]
    });
  }

}
