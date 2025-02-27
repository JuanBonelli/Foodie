import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import {
  heroBookOpen,
  heroArchiveBox,
  heroHome,
  heroPlusCircle,
  heroMicrophone,
  heroHandRaised,
  heroCamera,
  heroCog6Tooth,
} from '@ng-icons/heroicons/outline';
import {
  heroBookOpenSolid,
  heroArchiveBoxSolid,
  heroHomeSolid,
  heroCog6ToothSolid,
} from '@ng-icons/heroicons/solid';
import { NgFor, NgIf } from '@angular/common';
import { FooterVisibilityService } from '../../services/footer-visibility-service/footer-visibility.service';
import { faSolidUtensils } from '@ng-icons/font-awesome/solid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Dish, RecipeTime, RecipeType } from '../../../types/types';
import { DishService } from '../../services/dish-service/dish.service';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { InventoryService } from '../../services/inventory-service/inventory.service';
import { lucideUtensils } from '@ng-icons/lucide'

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    FontAwesomeModule,
    RouterLink,
    NgIconComponent,
    NgIf,
    NzPopoverModule,
    NzModalModule,
    NzButtonModule,
    NgFor,
    RecipeCardComponent,
  ],
  providers: [
    provideIcons({
      heroBookOpen,
      heroBookOpenSolid,
      heroArchiveBox,
      heroArchiveBoxSolid,
      heroPlusCircle,
      heroHome,
      heroHomeSolid,
      heroCog6Tooth,
      heroCog6ToothSolid,
      heroCamera,
      heroMicrophone,
      faSolidUtensils,
      heroHandRaised,
      lucideUtensils
    }),
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  hasToBeDisplayed: boolean = true;
  activeLink?: string = undefined;
  visible: boolean = false;
  buttonRecipeHasToBeDisplayed: boolean = true;
  needsToShowModal: boolean = false;
  needsToShowModal2: boolean = false;
  selectedMealType: RecipeType = 'LUNCH_DINNER';
  selectedCookTime: RecipeTime = 'NORMAL';

  selectedDishes: Dish[] = [];
  cookingDish: Dish | null = null;
  canSelectMuchTimeRecipe: boolean = true;


  constructor(
    private footerVisibilityService: FooterVisibilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dishService: DishService,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.footerVisibilityService.onGenerateRecipeButtonVisibilityChange.subscribe(
      (value: boolean) => this.toggleVisibilityButtonRecipe(value)
    );
    this.footerVisibilityService.onVisibilityChange.subscribe(
      (value: boolean) => this.toggleVisibility(value)
    );

    this.dishService.getCookingDish().subscribe((dish) => {
      console.log(dish);
      this.cookingDish = dish;
    });

    this.router.events.subscribe((val) => {
      this.activeLink = this.getFullPath(this.activatedRoute);
    });
  }

  getFullPath(route: ActivatedRoute): string {
    let fullPath = '';
    while (route) {
      if (route.snapshot.url.length) {
        fullPath +=
          '/' + route.snapshot.url.map((segment) => segment.path).join('/');
      }
      route = route.firstChild!;
    }
    return fullPath;
  }

  toggleVisibilityButtonRecipe(value: boolean) {
    this.buttonRecipeHasToBeDisplayed = value;
  }

  toggleVisibility(value: boolean) {
    this.hasToBeDisplayed = value;
  }

  setActive(selectedLink: string) {
    this.activeLink = selectedLink;
  }

  onUploadByAudio(): void {
    this.visible = false;
    this.router.navigateByUrl('/create/audio');
  }

  onUploadByImage() {
    this.visible = false;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera'; // Enable camera on mobile devices

    // Handle file selection
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const imageFile = target.files[0];

        // Upload the selected image
        this.inventoryService.postImage(imageFile).subscribe((res: number) => {
          const trackingId: number = res;
          this.router.navigate(['/create'], {
            queryParams: { id: trackingId },
          });
        });
      }
    };

    // Trigger the file selector
    input.click();
  }

  closeModal1() {
    this.needsToShowModal = false;
  }

  closeModal2() {
    this.needsToShowModal2 = false;
  }

  showModal1() {
    this.needsToShowModal = true;
  }

  showModal2() {
    this.needsToShowModal2 = true;
  }

  selectMealType(type: RecipeType) {
    this.selectedMealType = type;

    if(type === 'BREAKFAST_SNACK') {
      this.canSelectMuchTimeRecipe = false
      this.selectedCookTime = this.selectedCookTime = 'FAST';
    }
    else this.canSelectMuchTimeRecipe = true;
  }

  selectCookTime(time: RecipeTime) {
    this.selectedCookTime = time;
  }

  confirmSelection() {
    if (this.selectedMealType && this.selectedCookTime) {
      console.log(
        `Tipo de comida: ${this.selectedMealType}, Tiempo disponible: ${this.selectedCookTime}`
      );
      this.selectedDishes =  this.dishService.getDishesForCooking(this.selectedMealType,this.selectedCookTime);

    } else {
      console.warn(
        'Por favor selecciona el tipo de comida y el tiempo disponible.'
      );
    }
    this.needsToShowModal = false;
    this.needsToShowModal2 = true;
  }

  onUploadyManually() {
    this.router.navigate(['/create'], { queryParams: { id: undefined } });
  }
}
