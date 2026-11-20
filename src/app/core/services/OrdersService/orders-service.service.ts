import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdersServiceService {

  private readonly httpClient = inject(HttpClient)

  getUserOrders(userId:string):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}orders/user/${userId}`)
  }

}
