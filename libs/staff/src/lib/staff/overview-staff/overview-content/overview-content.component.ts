import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Booking,
  BookingsState,
  loadBookingsByDate,
  selectBookings,
  selectBookingsError
} from '@org/store';

@Component({
  selector: 'lib-overview-content',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatIcon,
    MatIconButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
  ],
  templateUrl: './overview-content.component.html',
  styleUrls: ['./overview-content.component.scss'],
})
export class OverviewContentComponent implements OnChanges {
  @Input() selectedDate: string | undefined;
  @Input() selectedCourtGroupId: string | undefined;
  bookings$: Observable<Booking[]>;
  error$: Observable<any>;
  filterStatus: 'Pending' | 'Approved' = 'Pending';

  constructor(
    private store: Store<{ bookings: BookingsState }>) {
    this.bookings$ = this.store.select(selectBookings);
    this.error$ = this.store.select(selectBookingsError);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate && this.selectedCourtGroupId) {
      this.store.dispatch(loadBookingsByDate({
        courtGroupId: this.selectedCourtGroupId,
        date: this.selectedDate,
        pageNumber: 1,
        pageSize: 10
      }));
    }
  }

  editBooking(bookingId: string): void {
    console.log('Edit booking with ID:', bookingId);
    // Implement the edit logic here
  }

  deleteBooking(bookingId: string): void {
    console.log('Delete booking with ID:', bookingId);
    // Implement the delete logic here
  }

  changeFilterStatus(status: 'Pending' | 'Approved'): void {
    this.filterStatus = status;
  }
}
