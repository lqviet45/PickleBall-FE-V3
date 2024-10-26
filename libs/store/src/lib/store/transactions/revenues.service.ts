import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AdminRevenueResponse,
  AdminRevenueTodayResponse,
  CurrentRevenue, OwnerRevenueResponse,
  OwnerRevenueTodayResponse,
  RevenueResponse, Transaction
} from './revenue.model';
import { map } from 'rxjs/operators';
import { PagedResponse } from '../PagedResponse.model';

@Injectable({
  providedIn: 'root'
})
export class RevenuesService {

  private baseUrl = 'https://pickleballapp.azurewebsites.net/api/users';
  private adminRevenueUrl = 'https://pickleballapp.azurewebsites.net/api/transactions'
  private transactionUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups'

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

  getOwnerRevenuesToday(ownerId: string): Observable<OwnerRevenueTodayResponse> {
    const url = `${this.adminRevenueUrl}/revenue-today-by-owner?OwnerId=${ownerId}`;
    return this.http.get<OwnerRevenueTodayResponse>(url);
  }

  getOwnerMonthlyRevenuesV2(ownerId: string, month: string, year: string): Observable<OwnerRevenueResponse> {
    const url = `${this.adminRevenueUrl}/revenue-by-owner-v2`;
    const params = { Month: month, Year: year, OwnerId: ownerId };
    return this.http.get<OwnerRevenueResponse>(url, { params });
  }
  getTransactionByCourtGroupId(courtGroupId: string, pageNumber: number, pageSize: number): Observable<PagedResponse<Transaction>> {
    const url = `${this.transactionUrl}/${courtGroupId}/transactions`;
    const params = { pageNumber: pageNumber.toString(), pageSize: pageSize.toString() };
    return this.http.get<{ value: PagedResponse<Transaction> }>(url, { params }).pipe(
      map(response => {
        if (response?.value?.items) {
          return response.value;
        } else {
          console.warn('Empty or unexpected API response:', response);
          throw new Error('Empty response or unexpected structure');
        }
      })
    );
  }
  getTransaction(pageNumber: number, pageSize: number): Observable<PagedResponse<Transaction>> {
    const url = `${this.adminRevenueUrl}`;
    const params = { pageNumber: pageNumber, pageSize: pageSize };
    return this.http.get<{ value: PagedResponse<Transaction> }>(url, { params }).pipe(
      map(response => {
        if (response?.value?.items) {
          return response.value;
        } else {
          console.warn('Empty or unexpected API response:', response);
          throw new Error('Empty response or unexpected structure');
        }
      })
    );
  }
}
