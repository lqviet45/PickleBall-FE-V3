import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Booking, BookingsState, loadBookings, selectBookings, selectBookingsError } from '@org/store';

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
  bookings$: Observable<Booking[]>;
  error$: Observable<any>;
  filterStatus: 'Pending' | 'Approved' = 'Pending';

  constructor(private store: Store<{ bookings: BookingsState }>) {
    this.bookings$ = this.store.select(selectBookings);
    this.error$ = this.store.select(selectBookingsError);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate'] && this.selectedDate) {
      this.store.dispatch(loadBookings({ date: this.selectedDate }));
    }
  }

  handleBookingCreated(): void {
    if (this.selectedDate) {
      this.store.dispatch(loadBookings({ date: this.selectedDate }));
    } else {
      console.error('Selected date is undefined. Cannot load bookings.');
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
