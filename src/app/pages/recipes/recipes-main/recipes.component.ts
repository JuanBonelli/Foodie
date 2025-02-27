import { Component, OnInit } from '@angular/core';

import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { RecipeCardComponent } from '../../../shared/components/recipe-card/recipe-card.component';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';

import { NgFor, NgIf } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import {
  heroAdjustmentsHorizontal,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';

import { faSolidUtensils } from '@ng-icons/font-awesome/solid';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';
import { RouterLink } from '@angular/router';
import { DishService } from '../../../shared/services/dish-service/dish.service';
import { Dish, RecipeFilter, RecipeTime } from '../../../types/types';
import { RecipeFilterService } from '../../../shared/services/recipe-filter-service/recipe-filter.service';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { FormsModule } from '@angular/forms';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    TopBarComponent,
    RouterLink,
    RecipeCardComponent,
    NgFor,
    NgIconComponent,
    NzInputModule,
    NzIconModule,
    NzTagModule,
    NzButtonComponent,
    FormsModule,
    NgIf,
    NzSpinModule
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',

  providers: [
    provideIcons({
      faSolidUtensils,
      heroAdjustmentsHorizontal,
      heroMagnifyingGlass,
    }),
  ],
})
export class RecipesComponent implements OnInit {
  constructor(
    private topbarConfigService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
    private dishService: DishService,
    private recipeFilterService: RecipeFilterService
  ) {}

  dishes: Dish[] = [];
  areDishesLoading: boolean = true;
  filteredDishes: Dish[] = [];
  activeFilters: string[] = [];
  recipeNameFilter: String = '';
  dishesCount: number = 0;

  ngOnInit(): void {
    this.dishService.getAllDishes().subscribe((newDishes) => {
      this.dishes=newDishes
      this.filterDishes(this.recipeFilterService.getFilters());
    })

    this.dishService.getAreDishesLoading().subscribe((loading) => {
      this.areDishesLoading = loading;
    });

    this.topbarConfigService.show();
    this.topbarConfigService.changeTitle('Recetas');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(true);
    this.topbarConfigService.changeBackButtonVisibility(false);
    this.topbarConfigService.changeHistoryRedirection('/recipes/history');

    this.footerVisibilityService.showGenerateRecipeButton();
    this.footerVisibilityService.show();
  }

  fillBacklog() {
    this.dishService.fillBacklog();
  }

  filterDishes(filters: RecipeFilter) {
    this.filteredDishes = this.dishes;
    this.activeFilters = [];
    if (filters.filterBy.recipeType !== '')
      this.filterByRecipeType(filters.filterBy.recipeType);
    if (filters.filterBy.recipeTime !== '')
      this.filterByRecipeTime(filters.filterBy.recipeTime);
    if (this.recipeNameFilter.trim() !== '')
      this.filterByName(this.recipeNameFilter);

    this.dishesCount = this.filteredDishes.length;
  }

  filterByRecipeType(recipeType: string) {
    this.filteredDishes = this.filteredDishes.filter(
      (dish) => dish.recipe.recipeType === recipeType
    );
    const recipeTypeLabel = recipeType === 'BREAKFAST_SNACK' ? 'Desayuno/Merienda' : 'Almuerzo/Cena';

    this.activeFilters.push("Tipo: "+ recipeTypeLabel);
  }

  filterByRecipeTime(recipeTime: RecipeTime) {
    this.filteredDishes = this.filteredDishes.filter((dish) => dish.recipe.recipeTime === recipeTime );

    const recipeTimeLabel = recipeTime === 'FAST' ? 'Rápido' : recipeTime === 'NORMAL' ? 'Normal' : 'Lento';

    this.activeFilters.push("Tiempo: "+ recipeTimeLabel);
  }

  filterByName(name: String) {

    this.activeFilters.push('Nombre: ' + name);

    this.filteredDishes = this.filteredDishes.filter((dish) =>
      dish.recipe.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  updateFilters() {
    let filters = this.recipeFilterService.getFilters();
    this.filterDishes(filters);
  }
}
