import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidUtensils } from '@ng-icons/font-awesome/solid';
import { heroAdjustmentsHorizontal } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-recipes-generator',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './recipes-generator.component.html',
  styleUrl: './recipes-generator.component.scss',
  providers: [
    provideIcons({
      faSolidUtensils,
      heroAdjustmentsHorizontal,
      
    }),]
})
export class RecipesGeneratorComponent {

}
