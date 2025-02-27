import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';

import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChartPie, heroCube } from '@ng-icons/heroicons/outline';

import {
  APackage,
  InventoryPreloadBatch,
  InventoryPreloadBatchItem,
  InventoryProductBody,
  ProductResponse,
} from '../../../types/types';

import { InventoryService } from '../../../shared/services/inventory-service/inventory.service';
import { ProductService } from '../../../shared/services/product-service/product.service';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import {
  NzSkeletonAvatarShape,
  NzSkeletonButtonShape,
  NzSkeletonInputSize,
  NzSkeletonModule
} from 'ng-zorro-antd/skeleton';

import { FormsModule } from '@angular/forms';
import { UserService } from '../../../shared/services/user-service/user.service';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { Subscription } from 'rxjs';
import { DishService } from '../../../shared/services/dish-service/dish.service';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';

@Component({
  selector: 'app-upload-main',
  standalone: true,
  imports: [
    TopBarComponent,
    ItemCardComponent,
    NgFor,
    NgIf,
    NgIconComponent,
    NzModalModule,
    NzSelectModule,
    NzButtonModule,
    NzSkeletonModule,
    NzDividerModule,
    NzSpaceModule,
    FormsModule,
  ],
  providers: [
    provideIcons({
      heroCube,
      heroChartPie,
    }),
  ],
  templateUrl: './upload-main.component.html',
  styleUrl: './upload-main.component.scss',
})
export class UploadComponent implements OnInit {
  retrievedItems: InventoryPreloadBatchItem[] = [];
  products: ProductResponse[] = [];

  selectedProductId?: number;

  needsStatusCheck: boolean = false;
  isAnalyzing: boolean = true;
  currentIntervalId: any;
  showProductsModal: boolean = false;
  hasAtLeastOneProduct: boolean = false;
  private queryParamSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService,
    private productService: ProductService,
    private userService: UserService,
    private topbarConfigurationService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
    private dishService: DishService
  ) { }

  ngOnInit(): void {
    this.topbarConfigurationService.show();
    this.topbarConfigurationService.changeTitle('Carga Productos');
    this.topbarConfigurationService.changeHistoryButtonVisibility(false);
    this.topbarConfigurationService.changeConfigButtonVisibility(false);
    this.topbarConfigurationService.changeBackButtonVisibility(true);
    this.footerVisibilityService.show();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.getProducts();

    this.queryParamSubscription = this.route.queryParams.subscribe((params) => {
      const queryParamId = params['id'];
      this.isAnalyzing = true;

      if (this.needsStatusChecking(queryParamId)) {
        this.hasAtLeastOneProduct = true;
        this.startStatusCheck(queryParamId);
      } else {
        this.isAnalyzing = false;
        this.stopStatusCheck();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamSubscription) {
      this.queryParamSubscription.unsubscribe();
    }
    this.stopStatusCheck();
  }

  getProducts() {
    this.productService
      .getProducts()
      .subscribe((products: ProductResponse[]) => {
        this.products = products;
      });
  }

  getQueryParamsId(): string | null {
    return this.route.snapshot.queryParamMap.get('id');
  }

  needsStatusChecking(id: string | null): boolean {
    return id ? true : false;
  }

  startStatusCheck(queryParamId: string): void {
    this.stopStatusCheck(); // Clear any existing intervals
    this.currentIntervalId = setInterval(() => {
      this.checkStatus(parseInt(queryParamId));
    }, 3000);
  }

  stopStatusCheck(): void {
    if (this.currentIntervalId) {
      clearInterval(this.currentIntervalId);
      this.currentIntervalId = null;
    }
  }

  checkStatus(id: number) {
    this.inventoryService
      .getAudioAnalysisStatus(id)
      .subscribe((res: InventoryPreloadBatch) => {
        if (res.status !== 'IN_PROCESS') {
          this.isAnalyzing = false;
          clearInterval(this.currentIntervalId);
          this.retrievedItems = res.items;
          this.retrievedItems = this.formatRetrievedItems(this.retrievedItems);
        }
      });
  }

  openProductsModal() {
    this.showProductsModal = true;
  }

  createItem(productId: number): InventoryPreloadBatchItem {
    let selectedProduct: ProductResponse = this.findProductById(productId);

    selectedProduct.unitType = this.convertUnitText(selectedProduct.unitType);

    let productDefaultPackage: APackage | undefined =
      this.getDefaultPackage(productId);
    let aPackage: APackage;

    if (productDefaultPackage !== undefined) {
      aPackage = {
        id: productDefaultPackage.id,
        productId: selectedProduct.id,
        isDefault: productDefaultPackage.isDefault,
        packageSize: productDefaultPackage.packageSize,
      };
    }

    let item: InventoryPreloadBatchItem = {
      product: selectedProduct,
      img: selectedProduct.imageUrl,
      quantity: 1,//al agregar un producto si o si debe estar en al inicio 1 no en 0
      apackage: aPackage! !== undefined ? aPackage! : null,
    };

    return item;
  }

  findProductById(productId: number): ProductResponse {
    return this.products.find(
      (product: ProductResponse) => product.id === productId
    )!;
  }

  getDefaultPackage(productId: number): APackage | undefined {
    let product: ProductResponse = this.findProductById(productId);
    return product.packages.find(
      (aPackage: APackage) => aPackage.isDefault === true
    );
  }

  uploadProductsToInventory() {
    let toUploadProducts: InventoryProductBody[] =
      this.getBodyFromRetrievedItems();
    this.userService.postInventory(toUploadProducts).subscribe({
      next: (res) => {
        //TODO : AGREGAR POPUP DE SUCCESS
        this.dishService.fillBacklog();
        this.router.navigate(['/inventory']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getBodyFromRetrievedItems(): InventoryProductBody[] {
    let items: InventoryProductBody[] = [];

    this.retrievedItems.forEach((item: InventoryPreloadBatchItem) => {
      items.push({
        productID: item.product.id,
        packageId: item.apackage === null ? 0 : item.apackage.id,
        quantity: item.quantity,
        type: item.apackage === null ? 'MASS' : 'UNITARY',
      });
    });

    return items;
  }

  handleCancel() {
    this.showProductsModal = false;
  }

  handleOk() {
    let createdItem = this.createItem(this.selectedProductId!);
    this.retrievedItems.push(createdItem);
    this.hasAtLeastOneProduct = true;
    this.showProductsModal = false;
  }

  saveSelectedPackage(event: any) {
    let itemIndex = this.retrievedItems.indexOf(event.item);
    this.retrievedItems[itemIndex].apackage = event.apackage;
  }

  removeItem(itemToRemove: InventoryPreloadBatchItem) {
    let indexToRemove = this.retrievedItems.indexOf(itemToRemove);
    this.retrievedItems.splice(indexToRemove, 1);
  }

  formatRetrievedItems(items: InventoryPreloadBatchItem[]): InventoryPreloadBatchItem[] {
    let formattedItems : InventoryPreloadBatchItem[] = [];

    items.forEach(item => {
      item.product.unitType = this.convertUnitText(item.product.unitType);

      formattedItems.push(item)
    });

    return formattedItems;
  }

  convertUnitText(unitType: string): string {
    const UNIT_TYPES: any = {
      "L": "lts",
      "UNIT": "Unidad",
      "KG": "kg",
      "G": "gr",
      "ML": "ml"
    }

    return UNIT_TYPES[unitType];


  }
}
