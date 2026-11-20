import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject (HttpClient)
  // getAllProducts
  getAllProducts():Observable<any>{
    return this.httpClient.get(`${environment.basUrl}products`)
  }
  // getSpecificProduct
  getSpecificProduct (productId:any):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}products/${productId}`)
  }
// getSpecificBrand
  getSpecificBrand(brandId:any):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}products?brand[in]=${brandId}`)
  }

  // getSpecificCategory
    getSpecificCategory(brandId:any):Observable<any>{
    return this.httpClient.get(`${environment.basUrl}products?category[in]=${brandId}`)
  }
}
