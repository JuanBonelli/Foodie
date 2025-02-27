import { Component, NgModule, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroCheck,
  heroMagnifyingGlass,
  heroTrash,
} from '@ng-icons/heroicons/outline';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [
    TopBarComponent,
    RouterLink,
    NgIconComponent,
    NgFor,
    NgClass,
    NgIf,
    NzPopconfirmModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
  ],
  providers: [provideIcons({ heroMagnifyingGlass, heroCheck, heroTrash })],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.scss',
})
export class PreferencesComponent implements OnInit {
  preferences = [
    {
      id: 1,
      name: 'Lacteo',
      selected: false,
    },
    {
      id: 2,
      name: 'Carne',
      selected: false,
    },
    {
      id: 3,
      name: 'Cereal',
      selected: false,
    },
  ];

  negativePreferences = [
    { id: 1, name: 'Mani', selected: false, confirming: false },
    { id: 2, name: 'Frutilla', selected: false, confirming: false },
  ];

  constructor(private topbarConfigService: TopbarConfigurationService) {}

  ngOnInit(): void {
    this.topbarConfigService.changeTitle('Preferencias');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(true);
  }

  confirmDelete(preference: any): void {
    // Establece el estado de confirmación en true solo para el elemento seleccionado
    this.negativePreferences.forEach((p) => {
      if (p.id === preference.id) {
        p.confirming = true;
      } else {
        p.confirming = false;
      }
    });
  }

  cancelDelete(preference: any): void {
    preference.confirming = false;
  }

  deletePreference(id: number): void {
    this.negativePreferences = this.negativePreferences.filter(
      (p) => p.id !== id
    );
  }

  selectCategory(id: number): void {
    const preference = this.preferences.find((p) => p.id === id);

    if (preference === undefined) return;

    preference.selected = !preference.selected;
  }

  inputValue: string = 'my site';
}
