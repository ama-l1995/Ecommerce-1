import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _FormBuilder: FormBuilder
  ) {}

  msgError: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z][a-z0-9]{6,20}$/),
      ]),
      rePassword: new FormControl(''),

      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: [this.confirmPass] } as FormControlOptions
  );

  // registerForm: FormGroup = this._FormBuilder.group({
  //   name: [
  //     '',
  //     [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
  //   ],
  //   email: ['', [Validators.required, Validators.email]],
  //   password: [
  //     '',
  //     [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
  //   ],
  //   rePassword: [
  //     '',
  //     [Validators.required, Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)],
  //   ],
  //   phone: [
  //     '',
  //     [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
  //   ],
  // } ,{validators:[this.confirmPass]} as FormControlOptions);

  confirmPass(group: FormGroup): void {
    let password = group.get('password');
    let rePassword = group.get('rePassword');

    if (password?.value == '') {
      rePassword?.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  handleForm(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this._AuthService.setRegister(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
          console.log(err.error.message);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
