import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  CourtYard, selectAllCourtYards, loadCourtYards,
  Slots, selectAllSlots, loadSlots,
  confirmBooking, cancelBooking, Booking
} from '@org/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'lib-approve-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton, MatInput],
  templateUrl: './confirm-booking.component.html',
  styleUrl: './confirm-booking.component.scss',
})
export class ConfirmBookingComponent implements OnInit {
  @Output() bookingConfirmed: EventEmitter<void> = new EventEmitter<void>();
  courtYards$: Observable<CourtYard[]>;
  slots$: Observable<Slots[]>;
  selectedCourtYard = '';
  selectedSlots: string[] = [];

  constructor(
    private store: Store,
    public dialogRef: MatDialogRef<ConfirmBookingComponent>,

    @Inject(MAT_DIALOG_DATA) public data: { courtGroupId: string; booking: Booking }
  ) {
    this.courtYards$ = this.store.select(selectAllCourtYards);
    this.slots$ = this.store.select(selectAllSlots);
  }

  ngOnInit(): void {
    this.loadCourtYards();
    this.courtYards$.subscribe(courtYards => {
      if (courtYards && courtYards.length > 0) {
        this.selectedCourtYard = courtYards[0].id;
        this.loadSlots(this.selectedCourtYard, this.data.booking.date.dateWorking);
      }
    });
  }

  onSlotSelect(slotId: string): void {
    const index = this.selectedSlots.indexOf(slotId);
    if (index > -1) {
      this.selectedSlots.splice(index, 1);
    } else {
      this.selectedSlots.push(slotId);
    }
  }

  onCourtYardSelect(courtYardId: string): void {
    this.selectedCourtYard = courtYardId;
    this.loadSlots(courtYardId, this.data.booking.date?.dateWorking);
  }

  loadCourtYards(): void {
    this.store.dispatch(loadCourtYards({
      courtGroupId: this.data.courtGroupId,
      pageNumber: 1,
      pageSize: 10
    }));
  }

  loadSlots(selectedCourtYard: string, selectedDate: string): void {
    this.store.dispatch(loadSlots({ courtYardId: selectedCourtYard, dateBooking: selectedDate }));
  }

  confirmBooking(): void {
    const bookingId = this.data.booking.id;
    const courtYardId = this.selectedCourtYard;
    const slotIds = this.selectedSlots;
    const dateBooking = this.data.booking.date.dateWorking;

    this.store.dispatch(confirmBooking({ bookingId, courtYardId, slotIds, dateBooking }));
    this.bookingConfirmed.emit();
    this.dialogRef.close();
  }

  onCancel(): void {
    const bookingId = this.data.booking.id;
    this.store.dispatch(cancelBooking({ bookingId }));
    this.bookingConfirmed.emit();
    this.dialogRef.close();
  }

  isSelected(slotId: string): boolean {
    return this.selectedSlots.includes(slotId);
  }
}
