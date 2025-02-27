import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  heroAdjustmentsHorizontal,
  heroMagnifyingGlass,
} from '@ng-icons/heroicons/outline';

import { Product, InventoryProductResponse, ProductCategory, ProductItem, InventoryFilter, Category } from '../../../types/types'

import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';

import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { InventoryService } from '../../../shared/services/inventory-service/inventory.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FilterService } from '../../../shared/services/filter-service/filter.service';

import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';
import { FormsModule } from '@angular/forms';
import { id_ID } from 'ng-zorro-antd/i18n';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    NgIconComponent,
    TopBarComponent,
    FormsModule,
    ProductCardComponent,
    NzInputModule,
    NzIconModule,
    NzEmptyModule,
    NzDividerModule,
    NzTagModule,
    NzSkeletonModule
  ],
  providers: [
    provideIcons({
      heroAdjustmentsHorizontal,
      heroMagnifyingGlass,
    }),
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class InventoryComponent {
  constructor(
    private inventoryService: InventoryService,
    private topbarConfigService: TopbarConfigurationService,
    private filterService: FilterService,
    private footerVisibilityService: FooterVisibilityService
  ) { }

  products: Product[] = [];
  filteredProducts: Product[] = [];
  activeFilters: string[] = [];
  productNameFilter: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getInventory();
    this.topbarConfigService.show();
    this.topbarConfigService.changeTitle('Inventario');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(false);
    this.topbarConfigService.changeHistoryRedirection('/inventory/history');

    this.footerVisibilityService.showGenerateRecipeButton();
    this.footerVisibilityService.show();

  }

  getInventory(): void {
    this.isLoading = true;
    this.inventoryService
      .getInventory()
      .subscribe((res: InventoryProductResponse[]) => {
        this.products = this.formatInventoryData(res);
        this.filteredProducts = this.products;
        console.log('filteredProducts', this.filteredProducts);
        this.filterInventory(this.filterService.getFilters());
        this.isLoading = false;
      });
  }

  filterInventory(filters: InventoryFilter) {
    this.filteredProducts = this.products;
    this.activeFilters = [];
    if (this.filterService.isFilterValid(filters.filterBy.category.id))
      this.filterByCategory(filters.filterBy.category);
    if (this.filterService.isFilterValid(filters.filterBy.unitType))
      this.filterByUnit(filters.filterBy.unitType);
    if (this.filterService.isFilterValid(filters.orderBy))
      this.orderBy(filters.orderBy);
    if (this.productNameFilter.trim() !== "")
      this.filterByName(this.productNameFilter);
  }

  filterByCategory(category: Category) {
    console.log('filtering by category: ', category.id);
    this.activeFilters.push(category.name);
    this.filteredProducts = this.filteredProducts.filter(
      (product: Product) => product.categoryId === category.id
    );
  }

  filterByUnit(unitType: string) {
    console.log('filtering by unit: ', unitType);
    this.activeFilters.push(unitType);
    this.filteredProducts = this.filteredProducts.filter(
      (product: Product) => product.unitType === unitType
    );
  }

  filterByName(name: string) {
    console.log('filtering by name: ', name);

    this.activeFilters.push('Nombre: ' + name);

    this.filteredProducts = this.filteredProducts.filter((product: Product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  updateFilters() {
    let filters = this.filterService.getFilters();
    this.filterInventory(filters);
  }

  orderBy(orderKey: string) {
    if (orderKey === 'cantidad') this.orderByQuantity();
  }

  orderByQuantity() {
    this.filteredProducts = this.filteredProducts.sort(
      (productA: Product, productB: Product) =>
        productB.totalQuantity - productA.totalQuantity
    );
  }

  formatInventoryData(inventoryProduct: InventoryProductResponse[]): Product[] {
    var inventory: Product[] = [];

    inventoryProduct.forEach((inventoryProduct: InventoryProductResponse) => {
      if (!this.hasProductBeenInitialized(inventory, inventoryProduct)) {
        this.initializeProduct(inventoryProduct, inventory);
      } else {
        this.addItemToProduct(inventoryProduct, inventory);
      }
    });

    return inventory;
  }

  initializeProduct(
    inventoryProduct: InventoryProductResponse,
    inventory: Product[]
  ) {
    let product: Product = this.createProduct(inventoryProduct);
    inventory.push(product);
  }

  addItemToProduct(
    inventoryProduct: InventoryProductResponse,
    inventory: Product[]
  ) {
    let toModifyProduct: Product = inventory.find(
      (product: Product) => product.id === inventoryProduct.product.id
    )!;

    let ProductIndex: number = inventory.indexOf(toModifyProduct);
    let itemToAdd = this.createProductItem(inventoryProduct);
    toModifyProduct.items.push(itemToAdd);
    toModifyProduct.totalQuantity += 1;
    inventory[ProductIndex] = toModifyProduct;
  }

  hasProductBeenInitialized(
    inventory: Product[],
    inventoryProduct: InventoryProductResponse
  ): boolean {
    return inventory.some(
      (item: Product) => inventoryProduct.product.id === item.id
    );
  }

  createProduct(inventoryProduct: InventoryProductResponse): Product {
    console.log("inventoryProduct", inventoryProduct)
    inventoryProduct = this.getCorrectUnit(inventoryProduct);

    return {
      id: inventoryProduct.product.id,
      name: inventoryProduct.product.name,
      img: this.getFormattedImage(inventoryProduct.product.imageUrl),
      categoryName: this.getProductMainCategory(
        inventoryProduct.product.productCategories
      ).name,
      categoryId: this.getProductMainCategory(
        inventoryProduct.product.productCategories
      ).id,
      unitType: inventoryProduct.product.unitType,
      totalQuantity: 1,
      items: [
        {
          approximateDaysExpiration:
            inventoryProduct.product.approximateDaysExpiration,
          entryDate: inventoryProduct.entryDate.toString(),
          initialQuantity: inventoryProduct.initialQuantity,
          currentQuantity: inventoryProduct.currentQuantity,
          unitType: this.formatUnit(inventoryProduct.product.unitType)
        },
      ],
    };
  }

  getFormattedImage(imageUrl: string): string {
  
    let imageParams = imageUrl?.split('?')[1];
    let imageIdParam = imageParams?.split('&')[0];
    let imageId = imageIdParam?.split('=')[1];

    let newImageUrl = 'https://drive.google.com/thumbnail?id=' + imageId;


    return newImageUrl;
  }

  createProductItem(inventoryProduct: InventoryProductResponse): ProductItem {
    inventoryProduct = this.getCorrectUnit(inventoryProduct);
    
    let productItem: ProductItem = {
      approximateDaysExpiration:
        inventoryProduct.product.approximateDaysExpiration,
      // entryDate: this.getFormattedDate(inventoryProduct.entryDate),
      entryDate: inventoryProduct.entryDate.toString(),
      initialQuantity: inventoryProduct.initialQuantity,
      currentQuantity: inventoryProduct.currentQuantity,
      unitType: this.formatUnit(inventoryProduct.product.unitType)
    };

    return productItem;
  }

  getProductMainCategory(productCategories: ProductCategory[]): Category {
    let mainCategory: Category = {
      id: -1,
      name: '',
    };
    productCategories.find((productCategory: ProductCategory) => {
      if (productCategory.isPrincipal) mainCategory = productCategory.category;
    });

    return mainCategory;
  }

  getFormattedDate(date: Date): string {
    return date.toLocaleDateString('es-AR');
  }

  formatUnit(unitType: string): string {
    const UNIT_TYPES: any = {
      "L": "lts",
      "UNIT": "Unidad",
      "KG": "kg",
      "G": "gr",
      "ML": "ml"
    }

    return UNIT_TYPES[unitType];
  }

  getCorrectUnit(product: InventoryProductResponse) : InventoryProductResponse {
    if(product.currentQuantity < 1) {
      product.currentQuantity *= 1000;
      
      if(product.product.unitType === 'KG') product.product.unitType = 'G'
      else if(product.product.unitType === 'L') product.product.unitType = "ML"
    }

    return product;
  }
}
