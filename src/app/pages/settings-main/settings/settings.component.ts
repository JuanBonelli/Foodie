import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  heroArrowLeftStartOnRectangle,
  heroBell,
  heroInformationCircle,
  heroMagnifyingGlass,
  heroPhone,
  heroUserCircle,
} from '@ng-icons/heroicons/outline';
import { ItemCardComponent } from '../../../shared/components/item-card/item-card.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';
import { LogoutButtonComponent } from '../../../shared/components/logout-button/logout-button.component';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    TopBarComponent,
    NgIconComponent,
    ItemCardComponent,
    NzButtonModule,
    RouterLink,
    LogoutButtonComponent,
  ],
  providers: [
    provideIcons({
      heroUserCircle,
      heroMagnifyingGlass,
      heroBell,
      heroPhone,
      heroInformationCircle,
      heroArrowLeftStartOnRectangle,
    }),
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  constructor(
    private topbarConfigService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
  ) { }

  ngOnInit(): void {
    this.topbarConfigService.show();
    this.topbarConfigService.changeTitle('Ajustes');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(false);

    this.footerVisibilityService.hideGenerateRecipeButton();
    this.footerVisibilityService.show();
  }
}
