  import { Component } from '@angular/core';
  import { CommonModule, NgOptimizedImage } from '@angular/common';
  import { HighchartsChartModule } from 'highcharts-angular';
  import { MatIcon } from '@angular/material/icon';
  import * as Highcharts from 'highcharts';
  import { Observable } from 'rxjs';
  import {
    CurrentRevenue,
    RevenueResponse,
    selectCurrentRevenue, selectCurrentUser,
    selectRevenuesData, selectRevenuesError,
    selectRevenuesLoading, loadCurrentRevenue,
    loadRevenues,
    UserInterface
  } from '@org/store';
  import { Store } from '@ngrx/store';

  @Component({
    selector: 'lib-overview-admin',
    standalone: true,
    imports: [CommonModule, HighchartsChartModule, MatIcon, NgOptimizedImage],
    templateUrl: './overview-admin.component.html',
    styleUrl: './overview-admin.component.scss',
  })
  export class OverviewAdminComponent {
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
    columnChartOptions!: Highcharts.Options;
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
      this.initializeChart();
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
    private initializeChart(): void {
      this.chartOptions = {
        chart: {
          type: 'pie', // Set chart type to pie
          backgroundColor: '#f4f4f4',
          borderRadius: 10,
        },
        title: {
          text: 'Top CourtGroup\'s Revenue ',
          style: {
            color: '#333333',
            fontSize: '20px',
            fontWeight: 'bold',
          },
        },
        series: [{
          type: 'pie', // Explicitly define the type as pie
          name: 'Revenue',
          data: [
            { name: 'PickleBall PRS 3', y: 56 },  // 30%
            { name: 'PickleBall PRS 4', y: 20 },  // 20%
            { name: 'San c5', y: 10 },  // 25%
            { name: 'Sân Phú Nhuận', y: 10 },  // 15%
            { name: 'Others', y: 4 }    // 10%
          ],
          showInLegend: true,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
          center: ['50%', '50%'], // Center the pie chart
          size: '60%', // Adjust the size if needed
        }],
        tooltip: {
          pointFormat: '<b>{point.y}%</b>',
        },
        legend: {
          align: 'right',
          layout: 'horizontal',
        },
      };
      this.columnChartOptions = {
        chart: {
          type: 'column', // Set chart type to column
          backgroundColor: '#f4f4f4',
          borderRadius: 10,
        },
        title: {
          text: 'Monthly Revenue Comparison',
          style: {
            color: '#333333',
            fontSize: '20px',
            fontWeight: 'bold',
          },
        },
        xAxis: {
          categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // Fake data categories
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Revenue',
          },
        },
        series: [{
          type: 'column',
          name: 'Revenue',
          data: [1000, 2000, 1500, 3000], // Fake revenue data
        }],
        tooltip: {
          headerFormat: '<b>{point.x}</b><br>',
          pointFormat: '{series.name}: {point.y}<br/>',
        },
        legend: {
          align: 'right',
          layout: 'vertical',
          verticalAlign: 'middle',
          borderWidth: 0,
        },
      };
    }
  }
