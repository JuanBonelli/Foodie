import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { heroArrowRightCircle } from '@ng-icons/heroicons/outline';
import { Chart, registerables} from 'chart.js/auto';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
Chart.register(...registerables);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [NgIconComponent, NgIf, RouterLink, NzButtonModule],
  providers:[
    provideIcons({
      heroArrowRightCircle,
    }),
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})

export class PieChartComponent implements OnInit {

  @Input() labels : string[] = [];
  @Input() data : number[] = [];
  chart: Chart | undefined | any;

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labels'] || changes['data']) {
      this.initializeChart();
    }
  }

  initializeChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    console.log("initializing chart");
    console.log(this.labels);
    console.log(this.data);

    this.chart = new Chart('pieChart',{
      type:'pie',
      data: {
        labels: this.labels,
        datasets: [{
          label:'Cantidad',
          data: this.data,
          backgroundColor: [
            '#FF747C',
            '#69BE28',
            '#3DD2F3',
            '#F5D136'
          ]
        }]
      },
      options: {
        layout: {
          padding: 16
        },
        plugins: {
          legend: {
            display: true,
            position: 'right',
            align: 'center',
            fullSize: true,
            labels: {
              usePointStyle: true,
              color: '#333333',
              font: {
                size: 14,
                family: 'Quicksand'
              }
            }
          },
          title: {
            display: true,
            position: 'top',
            align: 'start',
            color: '#333333',
            text: 'Cargas por Categoria',
            font: {
              size: 20,
              family: 'Quicksand'
            }
          },
        },
        responsive: false,
        maintainAspectRatio: false,
      }
    });
  }
}
