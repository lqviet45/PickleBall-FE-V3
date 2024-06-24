import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/bookings'; // Adjust based on your API URL

  constructor(private http: HttpClient) {}

  getBookingsByDate(selectedDate: string): Observable<Booking[]> {
    const url = `${this.apiUrl}/${selectedDate}`;
    return this.http.get<{ value: Booking[] }>(url).pipe(
      map(response => response.value) // Extract the value field
    );
  }
}
