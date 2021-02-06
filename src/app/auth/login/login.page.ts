import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColorEnum } from 'src/app/shared/enums/Color';
import { BaseForm } from 'src/app/shared/helpers/BaseForm';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends BaseForm implements OnInit {
  fields = [
    { label: 'E-mail', name: 'email', color: ColorEnum.LIGHT, type: 'text' },
    { label: 'Password', name: 'password', color: ColorEnum.LIGHT, type: 'password' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit(): void {
    this.service.login(this.formValue).subscribe(() => {
      this.router.navigate(['client', 'tabs', 'home']);
    });
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }
}
