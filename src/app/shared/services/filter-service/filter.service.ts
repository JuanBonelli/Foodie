import { EventEmitter, Injectable } from '@angular/core';
import { InventoryFilter } from '../../../types/types';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() {
    this.onFiltersChange = new EventEmitter();
  }

  public onFiltersChange: EventEmitter<InventoryFilter>;

  inventoryFilters: InventoryFilter = {
    orderBy: '',
    filterBy: {
      category: {
        id: -1,
        name: ''
      },
      isNearToExpirate: false,
      unitType: ''
    }
  };

  getFilters(): InventoryFilter {
    return this.inventoryFilters;
  }

  isFilterValid(filterKey: string | number): boolean {
    if (typeof filterKey === 'string') return filterKey.trim() !== '';
    else return filterKey !== -1;
  }


  setFilters(newFilters: InventoryFilter) {
    this.inventoryFilters = newFilters;
    this.onFiltersChange.emit(this.inventoryFilters);
  }

}
