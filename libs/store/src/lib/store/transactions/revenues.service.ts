import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RevenueResponse } from './revenue.model';

@Injectable({
  providedIn: 'root'
})
export class RevenuesService {

  private baseUrl = 'https://pickleballapp.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {}

  getRevenues(ownerId: string, month: string, year: string): Observable<RevenueResponse> {
    const url = `${this.baseUrl}/${ownerId}/revenues`;
    const params = { Month: month, Year: year };
    return this.http.get<RevenueResponse>(url, { params });
  }
}
