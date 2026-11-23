import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-logged-user-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-logged-user-password.component.html',
  styleUrl: './update-logged-user-password.component.css',
})
export class UpdateLoggedUserPasswordComponent {

  private readonly authServiceService = inject(AuthServiceService);
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  passwordForm = new FormGroup({
    currentPassword: new FormControl('', [
      Validators.required
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])\S+$/)
    ]),

    rePassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])\S+$/)
    ])
  });

  get currentPasswordControl() {
    return this.passwordForm.get('currentPassword');
  }

  get passwordControl() {
    return this.passwordForm.get('password');
  }

  get rePasswordControl() {
    return this.passwordForm.get('rePassword');
  }

  get passwordsMatch(): boolean {
    return this.passwordForm.get('password')?.value ===
      this.passwordForm.get('rePassword')?.value;
  }

  UpdateLoggedUserPassword() {

    this.isSuccess.set(false);
    this.errorMessage.set('');
    this.successMessage.set('');

    if (this.passwordForm.invalid || !this.passwordsMatch) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    if (
      this.passwordForm.get('currentPassword')?.value ===
      this.passwordForm.get('password')?.value
    ) {
      this.passwordControl?.setErrors({
        ...this.passwordControl.errors,
        samePassword: true
      });

      this.passwordControl?.markAsTouched();

      return;
    }

    this.isLoading.set(true);

    this.authServiceService.UpdateLoggedUserPassword(
      this.passwordForm.value
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading.set(false);
        this.toastr.success(
          'Your password has been updated successfully.',
          'Success'
        );
        this.isSuccess.set(true);
        this.successMessage.set(
          'Your password has been updated successfully.'
        );
        this.passwordForm.reset();
        this.router.navigate([`/sign-in`])
         this.authServiceService.isLogged.set(false);
      },

      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.error?.message ||
          'Something went wrong. Please check your current password and try again.'
        );
      }
    });
  }

}