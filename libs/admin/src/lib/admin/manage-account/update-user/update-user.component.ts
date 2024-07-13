import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { updateUser, UserInterface } from '@org/store';

@Component({
  selector: 'lib-update-user',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormField, MatInput, MatDialogActions, MatButton, MatLabel],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  updateUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.updateUserForm = this.fb.group({
      id: [data.id, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      firstName: [data.firstName, Validators.required],
      lastName: [data.lastName, Validators.required],
      location: [data.location, Validators.required],
      phoneNumber: [data.phoneNumber, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      dayOfBirth: [data.dayOfBirth, Validators.required]
    });
  }

  onSave(): void {
    if (this.updateUserForm.valid) {
      this.store.dispatch(updateUser({ user: this.updateUserForm.value }));
      this.dialogRef.close({ success: true }); // Emit success result
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
