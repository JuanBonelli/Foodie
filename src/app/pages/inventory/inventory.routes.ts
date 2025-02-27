import { Routes } from '@angular/router';
import { InventoryComponent } from './inventory-main/inventory.component';
import { InventoryFiltersComponent } from './inventory-filters/inventory-filters.component';
import { InventoryHistoryComponent } from './inventory-history/inventory-history.component';
import { UploadComponent } from '../upload/upload-main/upload-main.component';

export const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    component: InventoryComponent,
  },
  {
    path: 'filters',
    component: InventoryFiltersComponent,
  },
  {
    path: 'history',
    component: InventoryHistoryComponent
  },
  {
    path: 'create',
    component: UploadComponent
  }
];

