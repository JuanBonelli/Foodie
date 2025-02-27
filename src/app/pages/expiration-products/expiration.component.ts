import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { NgFor, NgIf } from '@angular/common';
import { InventoryProductResponse } from '../../types/types';
import { InventoryService } from '../../shared/services/inventory-service/inventory.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
    standalone: true,
    imports: [
      TopBarComponent,
      ProductCardComponent,
      NgFor,
      NgIf,
      NzSkeletonModule,
      NzSpinModule
    ],
    templateUrl: './expiration.component.html',
    styleUrl: './expiration.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  })
  export class ExpirationComponent {
    products: InventoryProductResponse[] = [];

    constructor(
      private inventoryService: InventoryService
    ) { }

    ngOnInit(): void {
      this.getInventory();
    }
  
    getInventory(): void {
      this.inventoryService.getExpiringInventory()
        .subscribe((res: InventoryProductResponse[]) => { this.products = res; });
    }

  }