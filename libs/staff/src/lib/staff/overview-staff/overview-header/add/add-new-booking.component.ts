import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingsService } from '@org/store';

@Component({
  selector: 'lib-add-new-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton],
  templateUrl: './add-new-booking.component.html',
  styleUrl: './add-new-booking.component.scss',
})
export class AddNewBookingComponent {
  @Output() bookingCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private bookingService: BookingsService,
    public dialogRef: MatDialogRef<AddNewBookingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { courtGroupId: string }
  ) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = {
        courtGroupId: this.data.courtGroupId,
        email: form.value.email,
        numberOfPlayers: form.value.nop,
        bookingDate: form.value.date,
        timeRange: form.value.time,
      };

      this.bookingService.createBooking(formData).subscribe(
        (response) => {
          console.log('Booking created successfully:', response);
          this.bookingCreated.emit(); // Emit event when booking is created
          this.dialogRef.close(); // Close dialog on success
        },
        (error) => {
          console.error('Error creating booking:', error);
          // Handle error, e.g., show error message
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
