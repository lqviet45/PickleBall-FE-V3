import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminRevenueResponse, AdminRevenueTodayResponse, CurrentRevenue, RevenueResponse } from './revenue.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RevenuesService {

  private baseUrl = 'https://pickleballapp.azurewebsites.net/api/users';
  private adminRevenueUrl = 'https://pickleballapp.azurewebsites.net/api/transactions'

  constructor(private http: HttpClient) {}

  getRevenues(ownerId: string, month: string, year: string): Observable<RevenueResponse> {
    const url = `${this.baseUrl}/${ownerId}/revenues`;
    const params = { Month: month, Year: year };
    return this.http.get<RevenueResponse>(url, { params });
  }

  getCurentMonthRevenues(ownerId: string): Observable<CurrentRevenue> {
    const url = `${this.baseUrl}/${ownerId}/revenues/current`;
    return this.http.get<{value: CurrentRevenue}>(url)
      .pipe(map(response => response.value));
  }
  getAllOwnerRevenueByMonth(month: number, year: number): Observable<AdminRevenueResponse> {
    const url = `${this.adminRevenueUrl}/owner-revenue?Month=${month}&Year=${year}`;
    const params = { Month: month, Year: year };
    return this.http.get<AdminRevenueResponse>(url, {params});
  }
  getAllOwnerRevenueByToday(): Observable<AdminRevenueTodayResponse> {
    const url = `${this.adminRevenueUrl}/owner-revenue-today`;
    return this.http.get<AdminRevenueTodayResponse>(url);
  }
}
