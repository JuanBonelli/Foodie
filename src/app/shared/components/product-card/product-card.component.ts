import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroClock } from '@ng-icons/heroicons/outline';
import { heroCalendarDaysMini, heroChartPieMini, heroTagMini } from '@ng-icons/heroicons/mini';
import { Product, ProductItem } from '../../../types/types';
import { NgIf } from '@angular/common';



@Component({
  selector: 'ProductCard',
  standalone: true,
  imports: [NgIconComponent, NgIf],
  providers: [
    provideIcons({
      heroClock,
      heroCalendarDaysMini,
      heroTagMini,
      heroChartPieMini
    })
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit {

  @Input() product: ProductItem = {

    approximateDaysExpiration: 0,
    entryDate: '',
    initialQuantity: 0,
    currentQuantity: 0,
    unitType: ''
  };

  @Input() img: string = 'https://static.vecteezy.com/system/resources/thumbnails/019/550/837/small_2x/milk-bottle-mockup-on-transparent-background-file-png.png';
  @Input() categoryName: string = '';


  expirationStatus = '';

  ngOnInit(): void {
    this.expirationStatus = this.checkExpirationStatus();
  }

  checkExpirationStatus(): string {
    let status = '';

    if (this.product.approximateDaysExpiration < 7) {
      status = 'critical';
    } else if (
      this.product.approximateDaysExpiration >= 7 &&
      this.product.approximateDaysExpiration < 14
    ) {
      status = 'warning';
    } else {
      status = 'good';
    }

    return status;
  }
}
