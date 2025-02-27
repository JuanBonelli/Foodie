import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { PieChartComponent } from '../../shared/components/pie-chart/pie-chart.component';
import { LineChartComponent } from '../../shared/components/line-chart/line-chart.component';
import { AuthService } from '@auth0/auth0-angular';
import { TopbarConfigurationService } from '../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { FooterVisibilityService } from '../../shared/services/footer-visibility-service/footer-visibility.service';
import { HomeService } from '../../shared/services/home.service';
import { SimpleChart } from '../../types/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopBarComponent, PieChartComponent, LineChartComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  pieChartLabels : string[] = []
  pieChartData: number[] = [];
  lineChartLabels : string[] = []
  lineChartData: number[] = [];

  constructor(
    private authService: AuthService,
    private topbarConfigService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getAuth0Token();
    this.topbarConfigService.show();
    this.topbarConfigService.changeTitle('Inicio');
    this.topbarConfigService.changeConfigButtonVisibility(false);
    this.topbarConfigService.changeHistoryButtonVisibility(false);
    this.topbarConfigService.changeBackButtonVisibility(false);

    this.footerVisibilityService.showGenerateRecipeButton();
    this.footerVisibilityService.show();


    this.homeService.getAmountByDayStatic().subscribe((res : SimpleChart) => {
      //invert the values and lavels
      this.lineChartData = res.values.reverse();
      this.lineChartLabels = res.labels.reverse();
    })

    this.homeService.getAmountByCategoryStatic().subscribe((res : SimpleChart ) => {
      this.pieChartData = res.values;
      this.pieChartLabels = res.labels;
    });

  }

  async getAuth0Token() {
    this.authService
      .getAccessTokenSilently()
      .subscribe((token) => localStorage.setItem('userToken', token));
  }
}
