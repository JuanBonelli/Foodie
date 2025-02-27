import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [TopBarComponent, NgFor, NgClass, NgIf, NzSwitchModule, FormsModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  notificationsAssets = [
    {
      id: 1,
      name: 'Novedades',
      selected: false,
      description: 'Descubrí nuevas secciones y funciones de la app',
    },

    {
      id: 2,
      name: 'Próximos a Vencer',
      selected: false,
      description:
        'Elegí si quieres que te avisemos cuando un producto esta proximo a vencer',
    },

    {
      id: 3,
      name: 'Nuevas Recetas',
      selected: false,
      description: 'No te pierdas nuevas recetas que ingresan cada día',
    },
  ];

  constructor(private topbarConfigService: TopbarConfigurationService) {}

  ngOnInit(): void {
    this.topbarConfigService.changeTitle('Notificaciones');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(true);
  }
}
