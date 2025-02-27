import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgIf } from '@angular/common';
import { DishService } from '../../services/dish-service/dish.service';
import { heroArrowPath, heroChevronRight, heroClock } from '@ng-icons/heroicons/outline';
import { Recipe } from '../../../types/types';

@Component({
  selector: 'RecipeCard',
  standalone: true,
  imports: [NgIconComponent, RouterLink,NzModalModule,NgIf],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
  providers: [
    provideIcons({
      heroChevronRight,
      heroClock,
      heroArrowPath,

    }),
  ],
})

export class RecipeCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() recipe:Recipe|null = null;
  @Input() dishId:number=0;
  @Input() showRefreshButton:boolean=false;
  @Input() shouldRedirect:boolean=true;


constructor(private dishService: DishService,){}

  needsToShowModal: boolean = false;

  showModal(){
    this.needsToShowModal=true
  }


  closeModal(): void {
    this.needsToShowModal = false;
  }

  refreshRecipe(): void {
    // Aquí puedes manejar la lógica para refrescar la receta
    this.dishService.refreshDish(this.dishId)
    console.log(this.dishId);
    this.closeModal();
  }


}
