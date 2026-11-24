import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../core/services/authService/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent  {
  private readonly router = inject(Router);
  private readonly authServiceService = inject(AuthServiceService);
  private readonly toaster = inject(ToastrService)
  private readonly platformId = inject(PLATFORM_ID)


  // ngOnInit(): void {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.loggedin.set(!!localStorage.getItem('tokenUser'));
  //   }
  // }
  // Lamp Interaction
  isLightOn = false;

  // Password Visibility
  showPassword = false;
  signInError = '';

  // Sign In Form
  signInForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

  // Turn Lamp On / Off
  toggleLamp() {
    this.isLightOn = !this.isLightOn;
  }

  // Show / Hide Password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // loggedin = signal(false)

  // Submit Form
  onSubmit() {
    this.signInError = '';
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
    this.authServiceService.signin(this.signInForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('tokenUser', response.token);
        localStorage.setItem('dataUser', JSON.stringify(response.user));
        this.router.navigate(['/home']);
        this.toaster.success(response.message, "", {
          progressBar: true
        })
         this.authServiceService.isLogged.set(true);
        interface IUserToken {
          id: string;
        }
        const token = localStorage.getItem('tokenUser');
        const decoded = jwtDecode<IUserToken>(token!);
        localStorage.setItem('userId', decoded.id);
      },
      error: (error) => {
        this.signInError = error.status === 400 || error.status === 401
          ? 'Email or password is incorrect.'
          : 'Unable to sign in right now. Please try again.';
      },
    });
  }

}
