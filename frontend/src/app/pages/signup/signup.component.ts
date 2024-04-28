import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { User } from '../../models/User/User';
import { AddressService } from '../../services/address.service';
import { UserService } from '../../services/user.service';
import { AlertSuccessComponent } from '../../components/alert-success/alert-success.component';
import { AlertFailureComponent } from '../../components/alert-failure/alert-failure.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, AlertSuccessComponent, AlertFailureComponent, SpinnerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})

export class SignupComponent {
  signUpForm: FormGroup;
  street: string = '';
  neighborhood: string = '';
  city: string = '';
  state: string = '';
  zipcodeIsInvalid: boolean = false;
  failMessage: string = ''
  alertSuccess: boolean = false;
  alertFailure: boolean = false;
  spinner: boolean = false;

  constructor(private _address: AddressService, private _user: UserService) {
    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)
      ]),
      cpf_cnpj: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      zipcode: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      street: new FormControl(''),
      addressComplement: new FormControl(''),
      addressNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      neighborhood: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
    });
  }

  getAddress(event: KeyboardEvent): void {
    const zipcode = this.signUpForm.get('zipcode')?.value;
    if (zipcode.length == 0 || zipcode.length < 8) {
      this.zipcodeIsInvalid = false
      this.street = '';
      this.neighborhood = '';
      this.city = '';
      this.state = '';
    }
    if (zipcode.length == 8) {
      this._address.getAddress(zipcode).subscribe({
        next: (response) => {
          if (!response.erro) {
            this.zipcodeIsInvalid = false;
            this.street = response.logradouro;
            this.signUpForm.controls['street'].setValue(response.logradouro);
            this.neighborhood = response.bairro;
            this.signUpForm.controls['neighborhood'].setValue(response.bairro);
            this.city = response.localidade;
            this.signUpForm.controls['city'].setValue(response.localidade);
            this.state = response.uf;
            this.signUpForm.controls['state'].setValue(response.uf);
          } else {
            this.zipcodeIsInvalid = true;
            this.street = '';
            this.neighborhood = '';
            this.city = '';
            this.state = '';
          }
        },
      });
    }
  }

  onSubmit() {
    this.spinner = true;
    window.scrollTo({top: 0})
    this._user.signUp(this.signUpForm.value as User).subscribe({
      next: (res) => {
        this.spinner = false;
        this.alertSuccess = true;
        this.signUpForm.reset();
        this.street = '';
        this.neighborhood = '';
        this.city = '';
        this.state = '';
        setTimeout(() => {
          this.alertSuccess = false;
        }, 3000)
      },
      error: (error) => {
        this.spinner = false;
        this.failMessage = error.error.message;
        this.alertFailure = true;
        setTimeout(() => {
          this.alertFailure = false;
        }, 3000)
      }
    });
  }
}
