import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CurrentRevenue, loadCurrentRevenue,
  loadRevenues,
  RevenueResponse, selectCurrentRevenue,
  selectCurrentUser,
  selectRevenuesData,
  selectRevenuesError,
  selectRevenuesLoading, UserInterface
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
  currentRevenue$: Observable<CurrentRevenue | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  chooseMonth: string
  chooseYear : string
  chooseMonthYear: string;
  ownerId = '';
  owner$: Observable<UserInterface | null>;
  chartOptions!: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;
  totalDayRevenue = 0;
  totalMonthRevenue = 0;
  playerCountOfMonth = 0;
  constructor(
    private store: Store
  ) {
    this.currentRevenue$ = this.store.select(selectCurrentRevenue);
    this.revenues$ = this.store.select(selectRevenuesData);
    this.loading$ = this.store.select(selectRevenuesLoading);
    this.error$ = this.store.select(selectRevenuesError);
    this.owner$ = this.store.select(selectCurrentUser);

    const now = new Date();
    this.chooseMonth = ('0' + (now.getMonth() + 1)).slice(-2);
    this.chooseYear = now.getFullYear().toString();
    this.chooseMonthYear = `${this.chooseYear}-${this.chooseMonth}`;

  }
    ngOnInit(): void {

      this.owner$.subscribe(user => {
        if (user && user.id) {
          this.ownerId = user?.id || '';
          //this.store.dispatch(loadRevenues({ ownerId: this.ownerId, month: this.month, year: this.year }));
          this.loadRevenues();
          this.loadCurrentRevenue();
        }

        this.revenues$.subscribe(data => {
          if (data) {
            this.updateChart(data);
          }
        });

        this.currentRevenue$.subscribe(currentRevenue => {
          if (currentRevenue) {
            this.totalDayRevenue = currentRevenue.totalDayRevenue;
            this.totalMonthRevenue = currentRevenue.totalMonthRevenue;
            this.playerCountOfMonth = currentRevenue.playerCountOfMonth;
          }
        })

      });

    }

  onMonthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const [year, month] = input.value.split('-');
      this.chooseYear = year;
      this.chooseMonth = month;
      this.loadRevenues();
    }
  }

  private loadRevenues(): void {
    this.store.dispatch(loadRevenues({ ownerId: this.ownerId, month: this.chooseMonth, year: this.chooseYear }));
  }

  private loadCurrentRevenue(): void {
    this.store.dispatch(loadCurrentRevenue({ ownerId: this.ownerId }));
  }

  private formatNumber(value: number): string {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + 'B';
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + 'M';
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + 'K';
    }
    return value.toString();
  }

  getFormattedTotalMonthRevenue(): string {
    return this.formatNumber(this.totalMonthRevenue);
  }

  getFormattedTotalDayRevenue(): string {
    return this.formatNumber(this.totalDayRevenue);
  }


  private updateChart(data: RevenueResponse): void {
    const weeks = data.value.weeks.map((week, index) => `Tuần ${index + 1}`);
    const revenueData = data.value.weeks.map(week => week.totalRevenue);
    const playersData = data.value.weeks.map(week => week.playerCount);

    this.chartOptions = {
      chart: {
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
      },
      title: {
        text: 'Doanh thu và số người chơi theo tuần',
        style: {
          color: '#333333',
          fontSize: '20px',
          fontWeight: 'bold'
        }
      },
      xAxis: {
        categories: weeks,
        title: {
          text: 'Tuần',
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
          text: 'Doanh thu',
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
          text: 'Số người chơi',
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
        name: 'Doanh thu',
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
        name: 'Số người chơi',
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

}
