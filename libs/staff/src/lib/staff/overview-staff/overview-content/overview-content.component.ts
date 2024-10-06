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
import { MatPaginator } from '@angular/material/paginator';
import { PagingComponent } from './paging';

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
    MatPaginator,
    PagingComponent
  ],
  templateUrl: './overview-content.component.html',
  styleUrls: ['./overview-content.component.scss'],
})
export class OverviewContentComponent implements OnChanges {
  @Input() selectedCourtGroupId: string | undefined;
  bookings$: Observable<Booking[]>;
  filteredBookings: Booking[] = [];
  error$: Observable<any>;
  filterStatus: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled' = 'Pending';
  pageSize = 4; // Adjust page size to 6 per page
  pageNumber = 0;
  totalBookings = 20;

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
      this.loadBookings();
    }
  }

  changeFilterStatus(status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'): void {
    this.filterStatus = status;
    this.loadBookings();
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadBookings();
  }

  loadBookings(): void {
    if (this.selectedCourtGroupId) {
      this.store.dispatch(
        loadBookingsByCourtGroup({
          courtGroupId: this.selectedCourtGroupId,
          pageNumber: this.pageNumber + 1, // Page number is 1-based
          pageSize: this.pageSize,
        })
      );

      this.bookings$.subscribe(bookings => {
        this.filteredBookings = this.filterBookingsByStatus(bookings, this.filterStatus);
      });
    }
  }

  filterBookingsByStatus(bookings: Booking[], status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'): Booking[] {
    return bookings.filter(booking => booking.bookingStatus === status);
  }

  confirmBooking(booking: Booking): void {
    const dialogRef = this.dialog.open(ConfirmBookingComponent, {
      data: { courtGroupId: this.selectedCourtGroupId, booking: booking },
    });

    dialogRef.componentInstance.bookingConfirmed.subscribe(() => {
      this.showSnackBar('Booking confirmed successfully.');
      this.loadBookings(); // Reload bookings after a new booking is added
    });
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Confirmed':
        return 'status-confirmed';
      case 'Completed':
        return 'status-completed';
      case 'Cancelled':
        return 'status -cancelled';
      default:
        return '';
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
