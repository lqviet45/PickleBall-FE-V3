import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatLabel, MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import {
  CourtGroup,
  CourtGroupState, loadBookingsByCourtGroup,
  loadCourtGroupByOwnerId,
  selectAllCourtGroups, selectCurrentUser, UserInterface
} from '@org/store';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AddNewBookingComponent } from './add/add-new-booking.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'lib-overview-header',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatDatepickerModule,
    FormsModule
  ],
  templateUrl: './overview-header.component.html',
  styleUrls: ['./overview-header.component.scss'],
})
export class OverviewHeaderComponent implements OnInit {
  courtGroupOptions$: Observable<CourtGroup[]>;
  selectedCourtGroup?: CourtGroup;
  user$: Observable<UserInterface | null>;
  ownerId = '';

  @Output() courtGroupChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private store: Store<CourtGroupState>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar // Import MatSnackBar for showing feedback
  ) {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups);
  }

  ngOnInit(): void {
    this.courtGroupOptions$.subscribe((courtGroups) => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0]; // Set to the first court group
        this.emitCourtGroupId(this.selectedCourtGroup.id); // Emit initial court group ID
      }
    });
    if (this.selectedCourtGroup) {
      this.store.dispatch(
        loadBookingsByCourtGroup({
          courtGroupId: this.selectedCourtGroup.id,
          pageNumber: 1,
          pageSize: 10,
        })
      );
    }

    this.user$.subscribe((user) => {
      this.ownerId = user?.supervisorId || '';
      this.store.dispatch(
        loadCourtGroupByOwnerId({ ownerId: this.ownerId, pageNumber: 1, pageSize: 10 })
      );
    });
  }

  onSelectCourtGroup(selectedGroup: CourtGroup): void {
    this.selectedCourtGroup = selectedGroup;
    this.emitCourtGroupId(selectedGroup.id);
    console.log(this.selectedCourtGroup, 'courtGroupId');
  }

  private emitCourtGroupId(courtGroupId: string): void {
    this.courtGroupChanged.emit(courtGroupId);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddNewBookingComponent, {
      data: { courtGroupId: this.selectedCourtGroup?.id },
    });

    dialogRef.componentInstance.bookingCreated.subscribe(() => {
      this.showSnackBar('Booking created successfully');
      this.loadBookings(); // Reload bookings after a new booking is added
    });
  }

  loadBookings(): void {
    if (this.selectedCourtGroup?.id) {
      this.store.dispatch(
        loadBookingsByCourtGroup({
          courtGroupId: this.selectedCourtGroup.id,
          pageNumber: 1,
          pageSize: 10,
        })
      );
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
