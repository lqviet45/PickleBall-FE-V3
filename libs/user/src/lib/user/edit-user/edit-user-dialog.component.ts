import { Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-edit-user-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent {

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    const formattedDate = this.formatDate(data.user.dayOfBirth);
    this.userForm = this.fb.group({
      id: [data.user.id],
      firstName: [data.user.firstName, Validators.required],
      lastName: [data.user.lastName, Validators.required],
      dayOfBirth: [formattedDate],
      phoneNumber: [data.user.phoneNumber],
      location: [data.user.location, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
    });

  }


  formatDate(dateString: string): string | null {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }


  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      console.log(formValue);
      this.dialogRef.close(formValue);
    }
  }
}
