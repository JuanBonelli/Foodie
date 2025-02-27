import { Component, OnInit } from "@angular/core";
import { Dish } from "../../../types/types";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TopbarConfigurationService } from "../../../shared/services/topbar-configuration-service/topbar-configuration.service";
import { DishService } from "../../../shared/services/dish-service/dish.service";
import { FooterVisibilityService } from "../../../shared/services/footer-visibility-service/footer-visibility.service";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NgFor } from "@angular/common";


@Component({
  standalone: true,
  imports: [RouterLink, NzButtonModule, NgFor],
  templateUrl: './recipe-step-by-step.component.html',
  styleUrl: './recipe-step-by-step.component.scss',
  schemas: [],
})
export class RecipeStepByStepComponent implements OnInit {
  id: string | null = '';

  dish: Dish | null = null;

  steps: string[] = [];


  constructor(
    private route: ActivatedRoute,
    private dishService: DishService,
    private topbarConfigService: TopbarConfigurationService,
    private footerService: FooterVisibilityService
  ) { }

  ngOnInit(): void {
    this.topbarConfigService.show();
    this.footerService.hide();


    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dish = this.dishService.getDishById(this.id);
      if (this.dish) {
        this.topbarConfigService.changeTitle(this.dish.recipe.name);
        this.getSteps(this.dish.recipe.recipeDescription);

      }
    }
  }

  setDishAsCooked() {
    if (this.dish) {
      this.dishService.setDishAsCooked(this.dish.id);
    }
  }

  getSteps(fullDescription: string) {
    let steps = fullDescription.split('.').map((step: string) => step[0] === '' ? step.slice(1) : step);

    this.steps = steps.slice(0, steps.length - 1);
  }
}
