import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadRevenues,
  RevenueResponse,
  selectRevenuesData,
  selectRevenuesError,
  selectRevenuesLoading
} from '@org/store';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'lib-overview-owner',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage, MatIcon, HighchartsChartModule],
  templateUrl: './overview-owner.component.html',
  styleUrl: './overview-owner.component.scss',
})
export class OverviewOwnerComponent implements OnInit{

  revenues$: Observable<RevenueResponse | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  month = '06';
  year = '2024';
  ownerId = '35be65a9-bdb5-4611-0420-08dc94ed41db';
  chartOptions!: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;
  constructor(
    private store: Store
  ) {
    this.revenues$ = this.store.select(selectRevenuesData);
    this.loading$ = this.store.select(selectRevenuesLoading);
    this.error$ = this.store.select(selectRevenuesError);
  }
    ngOnInit(): void {
      this.store.dispatch(loadRevenues({ ownerId: this.ownerId, month: this.month, year: this.year }));

      this.revenues$.subscribe(data => {
        if (data) {
          const weeks = data.value.weeks.map((week, index) => `Week ${index + 1}`);
          const revenueData = data.value.weeks.map(week => week.totalRevenue);
          const playersData = data.value.weeks.map(week => week.playerCount);

          this.chartOptions = {
            chart: {
              backgroundColor: '#f4f4f4',
              borderRadius: 10,
            },
            title: {
              text: 'Weekly Revenue and Player Count',
              style: {
                color: '#333333',
                fontSize: '20px',
                fontWeight: 'bold'
              }
            },
            xAxis: {
              categories: weeks,
              title: {
                text: 'Weeks',
                style: {
                  color: '#333333',
                  fontSize: '16px'
                }
              },
              labels: {
                style: {
                  color: '#333333',
                  fontSize: '14px'
                }
              }
            },
            yAxis: [{
              title: {
                text: 'Total Revenue',
                style: {
                  color: '#1E90FF',
                  fontSize: '16px'
                }
              },
              labels: {
                format: '{value}',
                style: {
                  color: '#1E90FF',
                  fontSize: '14px'
                }
              }
            }, {
              title: {
                text: 'Player Count',
                style: {
                  color: '#FF6347',
                  fontSize: '16px'
                }
              },
              labels: {
                format: '{value}',
                style: {
                  color: '#FF6347',
                  fontSize: '14px'
                }
              },
              opposite: true
            }],
            series: [{
              name: 'Total Revenue',
              data: revenueData,
              type: 'line',
              color: '#1E90FF',
              lineWidth: 2,
              marker: {
                enabled: true,
                radius: 4,
                fillColor: '#1E90FF'
              }
            }, {
              name: 'Player Count',
              data: playersData,
              type: 'line',
              color: '#FF6347',
              lineWidth: 2,
              marker: {
                enabled: true,
                radius: 4,
                fillColor: '#FF6347'
              },
              yAxis: 1
            }],
            legend: {
              itemStyle: {
                color: '#333333',
                fontSize: '14px'
              }
            },
            tooltip: {
              shared: true,
              backgroundColor: '#ffffff',
              borderColor: '#cccccc',
              style: {
                color: '#333333'
              }
            }
          };
        }
      });

    }
}
