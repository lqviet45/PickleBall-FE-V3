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

  constructor(private http: HttpClient) {
  }

  getBookingsByDate(selectedDate: string): Observable<Booking[]> {
    const url = `${this.apiUrl}/${selectedDate}`;
    return this.http.get<{ value: any[] }>(url).pipe(
      map(response =>
        response.value.map(item => ({
          id: item.id,
          courtYardId: item.courtYard ? item.courtYard.id : null,
          courtYardName: item.courtYard ? item.courtYard.name : null,
          courtGroup: {
            id: item.courtGroup.id,
            name: item.courtGroup.name,
            price: item.courtGroup.price,
          },
          userId: item.user ? item.user.id : null,
          numberOfPlayers: item.numberOfPlayers,
          timeRange: item.timeRange,
          userName: item.user ? item.user.userName : null,
          date: {
            dateId: item.date.dateId,
            dateWorking: item.date.dateWorking
          },
          bookingStatus: item.bookingStatus,
          createdOnUtc: item.createdOnUtc
        }))
      )
    );
  }
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
