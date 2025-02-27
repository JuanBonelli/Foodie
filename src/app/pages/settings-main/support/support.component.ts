import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { NgFor } from '@angular/common';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RouterLink, TopBarComponent, NgFor],
  templateUrl: './support.component.html',
  styleUrl: './support.component.scss',
})
export class SupportComponent implements OnInit {
  supportAssets = [
    {
      id: 1,
      name: 'Mail:',
      content: 'example@gmail.com',
    },
    {
      id: 2,
      name: 'Phone:',
      content: '11 5633-9537',
    },
  ];

  constructor(private topbarConfigService: TopbarConfigurationService) {}

  ngOnInit(): void {
    this.topbarConfigService.changeTitle('Ayuda en línea');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(true);
  }
}
