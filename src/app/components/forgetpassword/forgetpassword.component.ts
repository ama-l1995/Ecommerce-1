import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
})
export class ForgetpasswordComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  isLoading: boolean = false;
  forgetForm!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;
  first: boolean = true;
  seconde: boolean = false;
  done: boolean = false;
  errMsg: string = '';
  email: string = '';
  ngOnInit(): void {
    this.forgetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.verifyCode = new FormGroup({
      resetCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z][a-z0-9]{6,20}$/),
      ]),
    });

    this.resetPassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-z][a-z0-9]{6,20}$/),
      ]),
    });
  }

  handleForgetPassword(): void {
    this.isLoading = true;
    if (this.forgetForm.valid) {
      console.log(this.forgetForm.value);
      this._AuthService.setForgetPassword(this.forgetForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.statusMsg === 'success') {
            this.errMsg = response.message;
            this.isLoading = false;
            this.forgetForm.disable();

            this.email = this.forgetForm.get('email')?.value;
            this.first = false;
            this.seconde = true;
          }
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  handleVerify(): void {
    this.isLoading = true;
    if (this.verifyCode.valid) {
      console.log(this.verifyCode.value);
      this._AuthService.setVerify(this.verifyCode.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 'Success') {
            this.errMsg = response.status;
            this.isLoading = false;
            this.verifyCode.disable();
            this.seconde = false;
            this.done = true;
            this.resetPassword.get('email')?.setValue(this.email);
            this.resetPassword.get('email')?.disable();
          }
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  handleResetPass(): void {
    this.isLoading = true;
    if (this.resetPassword.valid) {
      console.log(this.resetPassword.value);
      const userData = {
        email: this.email,
        newPassword: this.resetPassword.get('newPassword')?.value,
      };
      this._AuthService.resetPass(userData).subscribe({
        next: (response) => {
          console.log(response);
          if (response?.token) {
            this.errMsg = response.message;
            localStorage.setItem('_token', response?.token);
            this._AuthService.saveUserData();
            this.isLoading = false;
            this.resetPassword.disable();
            setTimeout(() => {
              this._Router.navigate(['/home']);
            }, 1000);
          }
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
