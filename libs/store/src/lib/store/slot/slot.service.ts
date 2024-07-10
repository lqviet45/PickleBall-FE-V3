import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Slots } from './slot.model';
import { map } from 'rxjs/operators'; // Import the Slot model interface

@Injectable({
  providedIn: 'root'
})
export class SlotsService {

  apiUrl = 'https://pickleballapp.azurewebsites.net/api/courtyards'
  constructor(private http: HttpClient) { }

  getSlots(courtYardId: string, dateBooking: string): Observable<Slots[]> {
    const url = `${this.apiUrl}/${courtYardId}/slots?DateBooking=${dateBooking}`;
    return this.http.get<{ value: Slots[] }>(url).pipe(
      map(response => {
        return response.value;
      })
    );
  }
}
