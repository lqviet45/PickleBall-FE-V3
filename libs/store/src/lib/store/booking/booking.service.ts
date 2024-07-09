import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { catchError, map } from 'rxjs/operators';
import { PagedResponse } from '../PagedResponse.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/bookings'; // Adjust based on your API URL
  private getBookingsByDateUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups';
  constructor(private http: HttpClient) {
  }

  getBookingsByDate(courtGroupId: string, selectedDate: string, pageNumber: number, pageSize: number): Observable<PagedResponse<Booking>> {
    const url = `${this.getBookingsByDateUrl}/${courtGroupId}/bookings/${selectedDate}`;
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('PageNumber', pageNumber.toString());
    }
    if (pageSize) {
      params = params.set('PageSize', pageSize.toString());
    }
    return this.http.get<{ value: PagedResponse<Booking> }>(url, { params })
      .pipe(map(response => {
          if (response.value && response.value.items) {
            return response.value; // Return the PagedResponse<Booking> if items are present
          } else {
            // Handle empty response or unexpected structure
            console.warn('Empty or unexpected API response:', response);
            throw new Error('Empty response or unexpected structure');
          }
        }),
        catchError(error => {
          console.error('API request failed:', error);
          throw error; // Rethrow the error for the component to handle
        })
      );
  }
  cancelBooking(bookingId: string): Observable<any> {
    const url = `${this.apiUrl}/${bookingId}/cancel`;
    return this.http.put<any>(url, {});
  }
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
