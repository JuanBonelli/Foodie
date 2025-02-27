import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {RecipeFilter, RecipeTime, RecipeType} from '../../../types/types';
import {NgFor} from '@angular/common';
import { RecipeFilterService } from '../../../shared/services/recipe-filter-service/recipe-filter.service';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';

@Component({
  selector: 'app-recipe-filters',
  standalone: true,
  imports: [
    TopBarComponent,
    FontAwesomeModule,
    NgIf,
    RouterLink,
    NzSelectModule,
    NzButtonModule,
    NgFor,
    FormsModule
  ],
  templateUrl: './recipe-filters.component.html',
  styleUrl: './recipe-filters.component.scss',
})
export class RecipesFiltersComponent {
  constructor(
    private recipeFilterService: RecipeFilterService,
    private topbarVisibilityService: TopbarConfigurationService,
    private filterVisibilityService: FooterVisibilityService
  ) {}

  selectedButtons = ['estado'];

  searchIcon = faSearch;
  dropIcon = faChevronDown;

  filters: RecipeFilter = this.recipeFilterService.getFilters();

  recipeTypes: { label: string; value: RecipeType }[] = [
    {
      label: 'Desayuno/Merienda',
      value: 'BREAKFAST_SNACK',
    },
    {
      label: 'Almuerzo/Cena',
      value: 'LUNCH_DINNER',
    },
  ];

  recipeTimes: { label: string; value: RecipeTime }[] = [
    {
      label: 'Rápido',
      value: 'FAST',
    },
    {
      label: 'Medio',
      value: 'NORMAL',
    },
    {
      label: 'Lento',
      value: 'SLOW',
    },
  ];

  ngOnInit(): void {
    this.topbarVisibilityService.show();
    this.filterVisibilityService.hide();
  }

  applyFilters() {
    if (!this.filters) {
      return;
    }

    this.recipeFilterService.setFilters(this.filters);
    history.back();
  }

  clearFilters() {
    if (!this.filters) {
      return;
    }

    this.filters.filterBy.recipeType = '';
    this.filters.filterBy.recipeTime = '';
    this.filters.orderBy = '';

    this.recipeFilterService.setFilters(this.filters);
    history.back();
  }


  toggleSelected(selectedKey: string) {
    if (this.selectedButtons.includes(selectedKey)) {
      let index = this.selectedButtons.indexOf(selectedKey);
      this.selectedButtons.splice(index, 1);
    } else {
      this.selectedButtons.push(selectedKey);
    }
  }
}
