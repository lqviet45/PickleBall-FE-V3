import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-add-new-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButton],
  templateUrl: './add-new-booking.component.html',
  styleUrl: './add-new-booking.component.scss',
})
export class AddNewBookingComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
    // Handle the form submission...
  }
  constructor(public dialogRef: MatDialogRef<AddNewBookingComponent>) { }
  closeDialog() {
    this.dialogRef.close();
  }
}
