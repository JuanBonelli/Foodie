import { EventEmitter, Injectable } from '@angular/core';
import { RecipeFilter } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class RecipeFilterService {

  constructor() {
    this.onFiltersChange = new EventEmitter();
  }

  public onFiltersChange: EventEmitter<RecipeFilter>;

  recipeFilters: RecipeFilter = {
    orderBy: '',
    filterBy: {
      recipeType: '',
      recipeTime: '',
    },
  };

  getFilters(): RecipeFilter {
    return this.recipeFilters;
  }

  setFilters(newFilters: RecipeFilter) {
    this.recipeFilters = newFilters;
    this.onFiltersChange.emit(this.recipeFilters);
  }
}
