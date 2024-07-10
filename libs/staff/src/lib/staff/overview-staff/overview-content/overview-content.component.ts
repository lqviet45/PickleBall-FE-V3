import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  Booking,
  BookingsState, loadBookingsByCourtGroup,
  selectBookings,
  selectBookingsError
} from '@org/store';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBookingComponent } from './approve-booking/confirm-booking.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @Input() selectedCourtGroupId: string | undefined;
  bookings$: Observable<Booking[]>;
  filteredBookings: Booking[] = [];
  error$: Observable<any>;
  filterStatus: 'Pending' | 'Confirmed' | 'Cancelled' = 'Pending';

  constructor(
    private store: Store<{ bookings: BookingsState }>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {
    this.bookings$ = this.store.select(selectBookings);
    this.error$ = this.store.select(selectBookingsError);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCourtGroupId'] && this.selectedCourtGroupId) {
      this.store.dispatch(loadBookingsByCourtGroup({
        courtGroupId: this.selectedCourtGroupId,
        pageNumber: 1,
        pageSize: 10
      }));

      this.bookings$.subscribe(bookings => {
        this.filteredBookings = this.filterBookingsByStatus(bookings, this.filterStatus);
      });
    }
  }

  changeFilterStatus(status: 'Pending' | 'Confirmed' | 'Cancelled'): void {
    this.filterStatus = status;
    this.bookings$.subscribe(bookings => {
      this.filteredBookings = this.filterBookingsByStatus(bookings, status);
    });
  }

  filterBookingsByStatus(bookings: Booking[], status: 'Pending' | 'Confirmed' | 'Cancelled'): Booking[] {
    return bookings.filter(booking => booking.bookingStatus === status);
  }

  confirmBooking(bookingId: string): void {
    const dialogRef = this.dialog.open(ConfirmBookingComponent, {
      data: { courtGroupId: this.selectedCourtGroupId,
        bookingId: bookingId },
    });

    dialogRef.componentInstance.bookingConfirmed.subscribe(() => {
      this.showSnackBar('Successfully');
      this.loadBookings(); // Reload bookings after a new booking is added
    });
  }
  loadBookings(): void {
    if (this.selectedCourtGroupId) {
      this.store.dispatch(
        loadBookingsByCourtGroup({
          courtGroupId: this.selectedCourtGroupId,
          pageNumber: 1,
          pageSize: 10,
        })
      );
    }
  }

  deleteBooking(bookingId: string): void {
    console.log('Delete booking with ID:', bookingId);
    // Implement the delete logic here
  }
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
