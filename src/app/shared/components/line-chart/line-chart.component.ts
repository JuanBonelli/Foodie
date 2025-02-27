import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
Chart.register(...registerables);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];

  chart: Chart | undefined;

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

    this.chart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Cantidad de productos ingresados',
            data: this.data,
            borderColor: '#69BE28',
            pointBackgroundColor: '#69BE28',
            pointRadius: 5,
            tension: 0.5,
          },
        ],
      },
      options: {
        layout: {
          padding: 16,
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'start',
            fullSize: true,
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              color: '#333333',
              font: {
                size: 14,
                family: 'Quicksand',
              },
            },
          },
          title: {
            display: true,
            position: 'top',
            align: 'start',
            color: '#333333',
            text: 'Productos Ingresados',
            font: {
              size: 20,
              family: 'Quicksand',
            },
          },
        },
        aspectRatio: 4 / 3,
      },
    });
  }
}
