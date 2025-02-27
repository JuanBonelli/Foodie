import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChartPieMini } from '@ng-icons/heroicons/mini';
import { heroChartPie } from '@ng-icons/heroicons/outline';
import { ProductResponse } from '../../../types/types';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'IngredientCard',
  standalone: true,
  imports: [NgIconComponent, NgFor, NgIf],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.scss',
  providers: [
    provideIcons({
      heroChartPie,
    }),
  ],
})
export class ingredientCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() id: number = 0;
  @Input() quantity: number = 0;
  @Input() product: ProductResponse | null = null;

  getFormattedImage(imageUrl: string): string {
    // https://drive.usercontent.google.com/download?id=1uUkyRNx7Q1a_tmZKm65dlDv9ug0iv9y9&export=view&authuser=0
    if(imageUrl == "") return "";

    let imageParams = imageUrl.split('?')[1];
    let imageIdParam = imageParams.split('&')[0];
    let imageId = imageIdParam.split('=')[1];

    let newImageUrl = 'https://drive.google.com/thumbnail?id=' + imageId;
    console.log(newImageUrl);

    return newImageUrl;
  }
}
