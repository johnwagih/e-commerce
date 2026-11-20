import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistServiceService {
  private readonly httpClient = inject(HttpClient)





  // Add product to wishlist
  addWishlist(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.basUrl}wishlist`,
      {
        productId: productId
      })
  }

  // Remove product from wishlist
  removeProductFromWishlist(productId: string): Observable<any> {
    return this.httpClient.delete(`${environment.basUrl}wishlist/${productId}`)
  }
  // Get logged user wishlist
  Getloggeduserwishlist(): Observable<any> {
    return this.httpClient.get(`${environment.basUrl}wishlist`)
  }



}
