import { Injectable } from '@angular/core';
import { Unit } from '../../../types/types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient ) { }

  getUnits() {
    // return this.http.get<Unit[]>();
  }

  getMockUnits() : Unit[] {
    let units: Unit[] = [
      {
        id: 1,
        name: "L"
      },
      {
        id: 2,
        name: "KG"
      },
      {
        id: 3,
        name: "UNIDAD"
      }
    ]
    
    return units;
  }
}
