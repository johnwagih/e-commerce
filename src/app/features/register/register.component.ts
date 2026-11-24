import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly router = inject(Router)
  private readonly authServiceService = inject(AuthServiceService)
  private readonly toaster = inject(ToastrService)

  showPassword = false;
  showConfirmPassword = false;
  // registerForm
  registerForm = new FormGroup(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
          Validators.pattern(/^[\p{L}]{2,}(?:[ '-][\p{L}]{2,})+$/u),
        ],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/),
        ],
      }),
      rePassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(/^(?:0|\+20|0020)1[0125]\d{8}$/)],
      }),
    }, { validators: this.checkPassword }
  );
  // Show & Hide passworg 
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // checkPassword
  checkPassword(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (!password || !rePassword) {
      return null;
    }
    return password === rePassword ? null : { mismatch: true };
  }

  // submitRegisterForm
  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.authServiceService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          this.router.navigate(["/sign-in"])
          this.toaster.success(res.message,"",{
            progressBar:true
          })

        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    else {
      this.registerForm.markAllAsTouched()
    }
  }
}
