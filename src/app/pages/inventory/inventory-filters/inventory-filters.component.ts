import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { CategoryService } from '../../../shared/services/category-service/category.service';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { UnitService } from '../../../shared/services/unit-service/unit.service';
import { FilterService } from '../../../shared/services/filter-service/filter.service';

import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { Category, InventoryFilter, Unit } from '../../../types/types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';
@Component({
  selector: 'app-inventory-filters',
  standalone: true,
  imports: [
    NzSelectModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TopBarComponent,
    NgIf,
    RouterLink,
    NgFor
  ],
  templateUrl: './inventory-filters.component.html',
  styleUrl: './inventory-filters.component.scss',
})
export class InventoryFiltersComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private unitService: UnitService,
    private topbarConfigurationService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
    private filterService: FilterService
  ) { }

  categories: Category[] = [];
  units: Unit[] = [];


  filters: InventoryFilter = {
    orderBy: '',
    filterBy: {
      category: {
        id: -1,
        name: ''
      },
      isNearToExpirate: false,
      unitType: ''
    }
  }

  ngOnInit(): void {
    this.topbarConfigurationService.show();
    this.topbarConfigurationService.changeTitle('Filtros');
    this.topbarConfigurationService.changeHistoryButtonVisibility(false);
    this.topbarConfigurationService.changeBackButtonVisibility(true);
    this.footerVisibilityService.hide();

    this.categoryService.getCategories()
      .subscribe((res: Category[]) => { this.categories = res });
    this.units = this.unitService.getMockUnits();
  }

  toggleOrderBy(selectedKey: string) {
    if(this.filters.orderBy === selectedKey) this.filters.orderBy = '';
    this.filters.orderBy = selectedKey;
  }

  applyFilters() {
    this.filterService.setFilters(this.filters);
    history.back();
  }

  clearFilters() {
    this.filters.filterBy.category.id = -1;
    this.filters.filterBy.isNearToExpirate = false;
    this.filters.filterBy.unitType = '';
    this.filters.orderBy = '';

    this.filterService.setFilters(this.filters);
    history.back();
  }

}
