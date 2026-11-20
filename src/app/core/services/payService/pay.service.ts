import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PayService {
  private readonly httpClient = inject(HttpClient)
  // chechoutCash
  chechoutCash(body: any, cartId: any): Observable<any> {
    return this.httpClient.post(
      `${environment.basUrl}/orders/${cartId}`,
      body
    );
  }
  // chechoutVisa
  chechoutVisa(body: any, cartId: any): Observable<any> {
    return this.httpClient.post(`${environment.basUrl}orders/checkout-session/${cartId}?url=${environment.url}`, 
      body
    )
  }










}
