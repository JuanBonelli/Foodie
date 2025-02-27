import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroChevronLeft, heroClock } from '@ng-icons/heroicons/outline';
import { heroCog6ToothSolid } from '@ng-icons/heroicons/solid';
import { TopbarConfigurationService } from '../../services/topbar-configuration-service/topbar-configuration.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, NgIf, NgIconComponent],
  providers: [
    provideIcons({
      heroCog6ToothSolid,
      heroChevronLeft,
      heroClock,
    }),
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent implements OnInit {
  @Input() showBackButton: boolean = true;
  @Input() showHistoryButton: boolean = true;
  @Input() title: string = '';
  @Input() navigation: string = '';

  toHistoryPath: string = '/inventory/history';
  hasToBeDisplayed: boolean = true;
  titleSize: 'large' | 'small' = 'large';

  constructor(
    private topbarConfigService: TopbarConfigurationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.topbarConfigService.onVisibilityChange.subscribe(
      (value: boolean) => {
        this.toggleVisibility(value);
      }
    );

    this.topbarConfigService.onTitleChange.subscribe((title: string) => {
      this.titleSize = this.getTitleLength(title);
      this.changeTitle(title);
    });

    this.topbarConfigService.onHistoryButtonChange.subscribe(
      (hasToBeDisplayed: boolean) => {
        this.toggleHistoryButtonVisibility(hasToBeDisplayed);
      }
    );

    this.topbarConfigService.onBackButtonChange.subscribe(
      (hasToBeDisplayed: boolean) => {
        this.toggleBackButtonVisibility(hasToBeDisplayed);
      }
    );

    this.topbarConfigService.onHistoryRouteChange.subscribe((route: string) => {
      this.toggleHistoryPath(route);
    });
  }

  changeTitle(title: string): void {
    this.title = title;
  }

  toggleHistoryButtonVisibility(hasToBeDisplayed: boolean): void {
    this.showHistoryButton = hasToBeDisplayed;
  }

  toggleVisibility(hasToBeDisplayed: boolean): void {
    this.hasToBeDisplayed = hasToBeDisplayed;
  }

  toggleBackButtonVisibility(hasToBeDisplayed: boolean): void {
    this.showBackButton = hasToBeDisplayed;
  }

  toggleHistoryPath(path: string): void {
    this.toHistoryPath = path;
  }

  onNav() {
    this.router.navigate([this.toHistoryPath]);
  }

  navBack() {
    window.history.back();
  }

  getTitleLength(title: string): 'large' | 'small' {
    let titleLength: 'large' | 'small' = 'large';

    if (title.length < 20) titleLength = 'large';
    else if (title.length >= 20) titleLength = 'small'

    return titleLength;
  }
}
