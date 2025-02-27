import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../../types/types';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  getCategories() {
    return this.http.get<Category[]>(`${environment.baseUrl}/api/category`);
  }

  getMockCategories(): Category[] {
    let categories: Category[] = [
      {
        id: 1,
        name: 'Lacteos'
      },
      {
        id: 2,
        name: 'Legumbres'
      },
      {
        id: 3,
        name: 'Carnes'
      },
      {
        id: 4,
        name: 'Vegetales'
      }
    ]
    
    return categories;
  }


}
