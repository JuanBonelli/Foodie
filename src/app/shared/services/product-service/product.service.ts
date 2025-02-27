import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from '../../../types/types';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(
      `${environment.baseUrl}/api/product`
    );
  }
}
