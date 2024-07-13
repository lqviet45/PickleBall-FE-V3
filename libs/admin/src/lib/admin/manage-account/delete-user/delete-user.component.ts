import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { UserInterface, deleteUser } from '@org/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-delete-user',
  standalone: true,
  imports: [CommonModule, MatButton, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss',
})
export class DeleteUserComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    private store: Store
  ) {}

  onNoClick(): void {
    this.dialogRef.close({ success: false });
  }

  onYesClick(): void {
    if (this.data && this.data.id) {
      const userId = this.data.id;
      this.store.dispatch(deleteUser({ id: userId }));
      this.dialogRef.close({ success: true });
    }
  }
}
