import { Component, inject, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ingredientCardComponent } from '../../../shared/components/ingredient-card/ingredient-card.component';
import { DishService } from '../../../shared/services/dish-service/dish.service';
import { Dish, ProductInRecipe, ProductResponse } from '../../../types/types';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';


@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [TopBarComponent, NgFor, ingredientCardComponent, RouterLink, NzButtonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class ingredientDetailComponent implements OnInit {


  id: string | null = ""

  dish: Dish | null = null;
  recipeTitleLenght: 'large' | 'default' | 'small' = 'default';

  constructor(private route: ActivatedRoute, private dishService: DishService,
    private topbarConfigService: TopbarConfigurationService,
    private footerService: FooterVisibilityService,
  ) { }

  ngOnInit(): void {
    this.topbarConfigService.show();
    this.footerService.show();
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(true);

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.dish = this.dishService.getDishById(this.id)

      if (this.dish) {
        this.topbarConfigService.changeTitle(this.dish.recipe.name);
        this.formatDishesData();
        console.log("EL DISH;", this.dish);
      }
    }
  }

  setDishAsCooking() {
    if (this.dish) {
      this.dishService.setDishAsCooking(this.dish.id);
    }
  }

  formatDishesData() {
    this.dish?.recipe.products.forEach(product => {
      product = this.getCorrectUnit(product);
      product.productResponseDTO.unitType = this.formatUnit(product.productResponseDTO.unitType);
    })
  }

  formatUnit(unitType: string): string {
    const UNIT_TYPES: any = {
      "L": "lts",
      "UNIT": "Unidad",
      "KG": "kg",
      "G": "gr",
      "ML": "ml"
    }

    let newUnitType: string = '';
    if(unitType === 'ML' || unitType === 'G' || unitType === 'KG' || unitType === 'UNIT' || unitType === 'L') {
      newUnitType = UNIT_TYPES[unitType]
    } else {
      newUnitType = unitType;
    }

    return newUnitType;
  }

  getCorrectUnit(product: ProductInRecipe): ProductInRecipe {
    if (product.quantity < 1) {
      product.quantity *= 1000;
      if (product.productResponseDTO.unitType === 'KG') product.productResponseDTO.unitType = 'G'
      else if (product.productResponseDTO.unitType === 'L') product.productResponseDTO.unitType = "ML"
    }
    
    return product;
  }
}
