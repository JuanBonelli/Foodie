import { Component, OnInit } from '@angular/core';
import { HistoryCardComponent } from '../../../shared/components/history-card/history-card.component';
import { NgFor, NgIf } from '@angular/common';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { DishService } from '../../../shared/services/dish-service/dish.service';
import { Dish } from '../../../types/types';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { RecipeCardComponent } from '../../../shared/components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-recipes-history',
  standalone: true,
  imports: [HistoryCardComponent, NgFor, NgIf, NzButtonModule, NzEmptyModule, RecipeCardComponent],
  templateUrl: './recipes-history.component.html',
  styleUrl: './recipes-history.component.scss',
})
export class RecipesHistoryComponent implements OnInit {

  history : Dish[] = [];

  constructor(
    private footerVisibilityService: FooterVisibilityService,
    private topbarConfigService: TopbarConfigurationService,
    private dishService: DishService,
  ) { }

  ngOnInit(): void {

    this.footerVisibilityService.hideGenerateRecipeButton();
    this.footerVisibilityService.hide();

    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(true);
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeTitle('Historial');

    this.dishService.getHistory().subscribe((dishes: Dish[]) => {
      this.history = dishes;
    })
  }
}
