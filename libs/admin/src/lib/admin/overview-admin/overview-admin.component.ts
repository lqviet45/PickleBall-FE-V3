import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatIcon } from '@angular/material/icon';
import * as Highcharts from 'highcharts';
import { Observable } from 'rxjs';
import {
  selectRevenuesError,
  selectRevenuesLoading,
  loadAllOwnerRevenueByMonth,
  selectRevenuesData2,
  AdminRevenueResponse,
  UserService,
  AdminRevenueTodayResponse,
  selectRevenuesData3, loadAllOwnerRevenueByToday
} from '@org/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-overview-admin',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule, MatIcon, NgOptimizedImage],
  templateUrl: './overview-admin.component.html',
  styleUrl: './overview-admin.component.scss'
})
export class OverviewAdminComponent implements OnInit {
  revenues$: Observable<AdminRevenueResponse | null>;
  revenuesToday$: Observable<AdminRevenueTodayResponse | null>;
  loading$: Observable<boolean>;
  error$: Observable<any>;
  chooseMonth: number;
  chooseYear: number;
  chooseMonthYear: string;
  chartOptions!: Highcharts.Options;
  columnChartOptions!: Highcharts.Options;
  lineChartOptions!: Highcharts.Options;
  Highcharts: typeof Highcharts = Highcharts;
  totalRevenue = 0;
  totalBookings = 0;
  totalUsers = 0;
  totalRevenueToday = 0;
  totalBookingsToday = 0;
  totalProducts = 0;

  constructor(private store: Store, private userService: UserService) {
    this.revenues$ = this.store.select(selectRevenuesData2);
    this.loading$ = this.store.select(selectRevenuesLoading);
    this.error$ = this.store.select(selectRevenuesError);
    this.revenuesToday$ = this.store.select(selectRevenuesData3);
    const now = new Date();
    this.chooseMonth = now.getMonth() + 1;
    this.chooseYear = now.getFullYear();
    this.chooseMonthYear = `${this.chooseYear}-${this.chooseMonth}`;
    this.initializeChart();
    this.getUserCount();
  }

  // Use ngOnInit to call API when the component initializes
  ngOnInit(): void {
    this.loadRevenues();
    this.revenues$.subscribe(response => {
      if (response) {
        this.totalRevenue = response.value.totalRevenue * 5 / 100; // Adjust based on your data structure
        this.totalBookings = response.value.totalBookings; // Adjust based on your data structure
        this.totalProducts  = response.value.totalProducts
        this.initializeChart();
      }
    });
    this.loadRevenuesToday();
    this.revenuesToday$.subscribe(response => {
      if (response) {
        this.totalRevenueToday = response.value.todayRevenue * 5 / 100; // Adjust based on your data structure
        this.totalBookingsToday = response.value.todayBookings; // Adjust based on your data structure
      }
    });
  }

  getUserCount(): void {
    this.userService.countAllUsers().subscribe(
      (response) => {
        this.totalUsers = response.value; // Adjust this based on your API response structure
      },
      (error) => {
        console.error('Error fetching user count', error);
      }
    );
  }

  onMonthChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    // Parse the input value to get the year and month (assuming YYYY-MM format)
    const [year, month] = input.value.split('-').map(Number);

    if (year && month) {
      this.chooseYear = year; // Update chooseYear
      this.chooseMonth = month; // Update chooseMonth
      this.loadRevenues(); // Fetch the revenues for the new month and year
    }
  }

  private loadRevenues(): void {
    // Dispatch the action to load revenues based on the selected month and year
    this.store.dispatch(loadAllOwnerRevenueByMonth({ month: this.chooseMonth, year: this.chooseYear }));
  }

  private loadRevenuesToday(): void {
    // Dispatch the action to load revenues based on the selected month and year
    this.store.dispatch(loadAllOwnerRevenueByToday());
  }

  private initializeChart(): void {
    this.chartOptions = {
      chart: {
        type: 'pie', // Set chart type to pie
        backgroundColor: '#f4f4f4',
        borderRadius: 10
      },
      title: {
        text: 'Top CourtGroup\'s Revenue ',
        style: {
          color: '#333333',
          fontSize: '20px',
          fontWeight: 'bold'
        }
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
          format: '{point.name}'
        },
        center: ['50%', '50%'], // Center the pie chart
        size: '60%' // Adjust the size if needed
      }],
      tooltip: {
        pointFormat: '<b>{point.y}%</b>'
      },
      legend: {
        align: 'right',
        layout: 'horizontal'
      }
    };

    this.columnChartOptions = {
      chart: {
        type: 'column', // Set chart type to column
        backgroundColor: '#f4f4f4',
        borderRadius: 10
      },
      title: {
        text: 'Total Players from 6:00 to 20:00', // Change title to reflect players
        style: {
          color: '#333333',
          fontSize: '20px',
          fontWeight: 'bold'
        }
      },
      xAxis: {
        categories: ['6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'], // Time slots
        title: {
          text: 'Time of Day', // Label for xAxis
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
      yAxis: {
        min: 0,
        title: {
          text: 'Number of Players', // Change label to Number of Players
          style: {
            color: '#333333',
            fontSize: '16px'
          }
        },
        labels: {
          format: '{value}', // Format for the yAxis labels
          style: {
            color: '#333333',
            fontSize: '14px'
          }
        }
      },
      series: [{
        type: 'column',
        name: 'Players',
        data: [25, 50, 20, 15, 10, 50, 40, 20], // Fake data for number of players in each time slot
        color: '#1E90FF' // Color for the columns
      }],
      tooltip: {
        headerFormat: '<b>{point.x}</b><br>',
        pointFormat: '{series.name}: {point.y} players<br/>' // Tooltip format for players
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        verticalAlign: 'middle',
        borderWidth: 0
      }
    };

    this.revenues$.subscribe(response => {
      if (response) {
        const weeks = response.value.weeks.map(r => r.week);
        const revenueData = response.value.weeks.map(item => item.totalRevenue * 5 / 100);
        const bookingData = response.value.weeks.map(r => r.totalBookings);

        this.lineChartOptions = {
          chart: {
            backgroundColor: '#f4f4f4',
            borderRadius: 10
          },
          title: {
            text: 'Weekly Revenue',
            style: {
              color: '#333333',
              fontSize: '20px',
              fontWeight: 'bold'
            }
          },
          xAxis: {
            categories: weeks,
            title: {
              text: 'Week',
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
              text: 'Revenue (VND)',
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
              text: 'Players',
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
            name: 'Revenue',
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
            name: 'Bookings',
            data: bookingData,
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
