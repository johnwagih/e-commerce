import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {


  isLogged = signal(false)


  private readonly httpClient  = inject(HttpClient)
  // sign Up
  signUp(data:any):Observable<any>{
    return this.httpClient.post(`${environment.basUrl}auth/signup`,data)
  }
  // sign in
  signin(data:any):Observable<any>{
   return  this.httpClient.post(`${environment.basUrl}auth/signin`,data)
  }
  // submit Email
  submitEmail(data:any):Observable<any>{
   return  this.httpClient.post(`${environment.basUrl}auth/forgotPasswords`,data)
  }
  // Verify Reset Code
  submitOtp(data:any):Observable<any>{
   return  this.httpClient.post(`${environment.basUrl}auth/verifyResetCode`,data)
  }
  // Reset Password
  submitNewPassword(data:any):Observable<any>{
   return  this.httpClient.put(`${environment.basUrl}auth/resetPassword`,data)
  }
}
