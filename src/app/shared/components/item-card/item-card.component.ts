import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroChartPie,
  heroCube,
  heroMinus,
  heroPlus,
  heroXMark,
} from '@ng-icons/heroicons/outline';

import {
  APackage,
  InventoryPreloadBatchItem
} from '../../../types/types';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ItemCard',
  standalone: true,
  imports: [NgIconComponent, NzSelectModule, NgFor, NgIf, FormsModule],
  providers: [
    provideIcons({
      heroPlus,
      heroMinus,
      heroCube,
      heroChartPie,
      heroXMark,
    }),
  ],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent implements OnInit {
  @Input() editableQuantity: boolean = false;
  @Input() item?: InventoryPreloadBatchItem;
  @Input() creationMode: boolean = false;
  @Output() onRemoveItem: EventEmitter<InventoryPreloadBatchItem> = new EventEmitter<InventoryPreloadBatchItem>();
  @Output() onPackageChanged: EventEmitter<{ apackage: APackage; item: InventoryPreloadBatchItem; }> = new EventEmitter<{ apackage: APackage; item: InventoryPreloadBatchItem; }>();

  selectedPackageId: number = -1;
  packages: APackage[] | undefined = [];
  isAProductWithPackages: boolean = true;


  constructor(
    private modal: NzModalService
  ) { }

  ngOnInit(): void {

    this.packages = this.item?.product.packages;
    if (this.packages?.length === 0) this.isAProductWithPackages = false;
    else {
      let apackage = this.getDefaultaPackage();
      this.selectedPackageId = apackage.id;


      this.onPackageChanged.emit({
        apackage: apackage,
        item: this.item!
      });
    }

  }

  getDefaultaPackage(): APackage {
    let apackage = this.packages?.find((apackage: APackage) => apackage.isDefault === true);
    return apackage!;
  }

  removeItem(itemToRemove: InventoryPreloadBatchItem): void {
    this.modal.confirm({
      nzTitle: 'Estas seguro que lo quieres eliminar?',
      nzContent: `<b style="color: red;"> ${this.item?.product.name} </b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.onRemoveItem.emit(itemToRemove),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  incrementQuantity(value: number): void {
    this.item!!.quantity += value;
  }

  decreaseQuantity(value: number): void {
    if (this.item && this.item.quantity > value) {
      this.item.quantity -= value;
    }
  }

  onChangeUnit() {
    let apackage = this.getDefaultaPackage();
    this.onPackageChanged.emit({
      apackage: apackage,
      item: this.item!
    });
  }

  formatUnitLabel(unitString: string): string {
    let firstLetter: string = unitString.charAt(0).toUpperCase();
    let remainingWord: string = unitString
      .slice(1, unitString.length)
      .toLowerCase();

    return firstLetter + remainingWord;
  }

  getFormattedImage(imageUrl: string) : string{
    // https://drive.usercontent.google.com/download?id=1uUkyRNx7Q1a_tmZKm65dlDv9ug0iv9y9&export=view&authuser=0
    let imageParams = imageUrl.split('?')[1];
    let imageIdParam = imageParams.split('&')[0];
    let imageId = imageIdParam.split('=')[1];

    let newImageUrl = 'https://drive.google.com/thumbnail?id=' + imageId;
    console.log(newImageUrl);

    return newImageUrl;
  }

}
