import { AbstractControl, FormControl, FormGroup, FormGroupName, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';
import { log } from 'console';
import { sign } from 'crypto';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterLink, ReactiveFormsModule,],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  private readonly router = inject(Router)
  private readonly authServiceService = inject(AuthServiceService)
  showConfirmPassword = false;
  currentStep = signal(1);
  // currentStep = signal(1);
  nextStep() {
    this.currentStep.update(step => step + 1);
  }
  previousStep() {
    this.currentStep.update(step => step - 1);
  }

  formGroupEmail = new FormGroup(
    {
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
    })

  // form control otp  
formGropOtp = new FormGroup({
  resetCode: new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(7),
      Validators.pattern(/^[0-9]{6}$/),
    ],
  }),
});


  // passwordMatchValidator
  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (!password || !confirmPassword) {
      return null;
    }
    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };
  // form control new Password 
  formGropPassword = new FormGroup(
    {
      newPassword: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
        ],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
        ],
      }),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );
// toggleConfirmPassword
  toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

// eye 
eye =false


  // sumbitEmail(){
  sumbitEmail() {
    console.log(this.formGroupEmail.value)
    if (this.formGroupEmail.valid) {
      this.authServiceService.submitEmail(this.formGroupEmail.value).subscribe({
        next: (res) => {
          console.log(res)
          if (this.currentStep()==2) {
            this.currentStep.set(2)
          }
          else{
            this.nextStep()
          }
          console.log(this.currentStep())
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }
  // sumbitOtp
sumbitOtp() {
  if (this.formGropOtp.invalid) {
    this.formGropOtp.markAllAsTouched();
    return;
  }
  this.authServiceService.submitOtp(this.formGropOtp.value).subscribe({
    next: (res) => {
      console.log(res);
      this.nextStep();
    },
    error: (err) => {
      console.log(err);
    },
  });
}
  // sumbitNewPass
  sumbitNewPass() {
    let paylod = {
      email: this.formGroupEmail.controls.email.value,
      newPassword: this.formGropPassword.controls.newPassword.value
    }
    if (paylod && this.formGropPassword.valid) {
      this.authServiceService.submitNewPassword(paylod).subscribe({
        next: (res) => {
          console.log(res)
          this.router.navigate(['/sign-in'])
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
  }
}
