import { environment } from './../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private readonly httpClient = inject(HttpClient)
  cartCounter = signal(0)

  // Add Product To Cart
  addToCart(productId: any): Observable<any> {
    return this.httpClient.post(`${environment.basUrlCart2}cart/`, {
      productId: productId
    })
  }
  // Get Logged User Cart
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.basUrlCart2}cart`)
  }

  // Update Cart Product Quantity
  updateCartQuantity(productId: any, count: any): Observable<any> {
    return this.httpClient.put(`${environment.basUrlCart2}cart/${productId}`, {
      count: count
    })
  }

  // Remove Product From Cart
  removeCart(productId: any): Observable<any> {
    return this.httpClient.delete(`${environment.basUrlCart2}cart/${productId}`)
  }

  // Clear User Cart
  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.basUrlCart2}cart`)
  }

}
