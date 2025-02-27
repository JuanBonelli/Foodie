import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { SimpleChart } from '../../types/types';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAmountByDayStatic() : Observable<SimpleChart>{
    let today = new Date();
    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    let startDate = `${sevenDaysAgo.getFullYear()}-${sevenDaysAgo.getMonth() + 1}-${sevenDaysAgo.getDate()}`;
    let endDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    return this.http.get<SimpleChart>(`${environment.baseUrl}/api/statistics/inventory-amount-by-day?dateFrom=${startDate}&dateTo=${endDate}`);
  }

  getAmountByCategoryStatic() : Observable<SimpleChart>{
      let today = new Date();
      let sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      let startDate = `${sevenDaysAgo.getFullYear()}-${sevenDaysAgo.getMonth() + 1}-${sevenDaysAgo.getDate()}`;
      let endDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() +1 } `;

    return this.http.get<SimpleChart>(`${environment.baseUrl}/api/statistics/inventory-amount-by-category?dateFrom=${startDate}&dateTo=${endDate}`);
  }
}
