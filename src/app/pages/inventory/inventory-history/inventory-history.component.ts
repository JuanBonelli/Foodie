import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';
import { NgFor } from '@angular/common';
import { HistoryCardComponent } from '../../../shared/components/history-card/history-card.component';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';


@Component({
  selector: 'app-inventory-history',
  standalone: true,
  imports: [TopBarComponent, ItemCardComponent, NgFor, HistoryCardComponent],
  templateUrl: './inventory-history.component.html',
  styleUrl: './inventory-history.component.scss'
})
export class InventoryHistoryComponent implements OnInit {

  constructor( private footerVisibilityService: FooterVisibilityService,
              private topbarConfigService: TopbarConfigurationService,
  ) {
    
   }
   
   ngOnInit(): void {
    this.footerVisibilityService.hideGenerateRecipeButton();
    this.topbarConfigService.changeHistoryButtonVisibility(false);
   }

  history = [ 
    {
      id: 1,
      product: 'Leche Descremada',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/019/550/837/small/milk-bottle-mockup-on-transparent-background-file-png.png',
      date: new Date('2024.10.06'),
      quantity: 6
    },
    {
      id: 1,
      product: 'Queso',
      image: 'https://png.pngtree.com/png-clipart/20230928/original/pngtree-slice-of-cheese-png-image_13005463.png',
      date: new Date('2024.10.06'),
      quantity: 2
    },
    {
      id: 1,
      product: 'Arroz',
      image: 'https://static.vecteezy.com/system/resources/previews/021/217/210/non_2x/rice-grain-food-png.png',
      date: new Date('2024.10.06'),
      quantity: 3
    },
    {
      id: 1,
      product: 'Aceite',
      image: 'https://static.vecteezy.com/system/resources/previews/035/681/442/non_2x/ai-generated-oil-in-bottle-isolated-on-transparent-background-free-png.png',
      date: new Date('2024.10.06'),
      quantity: 4
    },
    {
      id: 1,
      product: 'Aceite',
      image: 'https://static.vecteezy.com/system/resources/previews/035/681/442/non_2x/ai-generated-oil-in-bottle-isolated-on-transparent-background-free-png.png',
      date: new Date('2024.10.06'),
      quantity: 4
    },
    {
      id: 1,
      product: 'Aceite',
      image: 'https://static.vecteezy.com/system/resources/previews/035/681/442/non_2x/ai-generated-oil-in-bottle-isolated-on-transparent-background-free-png.png',
      date: new Date('2024.10.06'),
      quantity: 4
    },
    {
      id: 1,
      product: 'Aceite',
      image: 'https://static.vecteezy.com/system/resources/previews/035/681/442/non_2x/ai-generated-oil-in-bottle-isolated-on-transparent-background-free-png.png',
      date: new Date('2024.10.06'),
      quantity: 4
    }
  ];
}
