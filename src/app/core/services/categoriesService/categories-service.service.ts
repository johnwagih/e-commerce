import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesServiceService {

  private readonly httpClient = inject(HttpClient)


// Get All Categories
GetAllCategories():Observable<any>{
  return this.httpClient.get(`${environment.basUrl}categories`)
}



// Get specific category unuse
// GetSpecificCategory(categoryId:string):Observable<any>{
//   return this.httpClient.get(`${environment.basUrl}categories/${categoryId}`)
// }

}
