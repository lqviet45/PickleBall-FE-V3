import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'lib-delete-manager-confirm',
  standalone: true,
  imports: [CommonModule, MatButton, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-manager-confirm.component.html',
  styleUrl: './delete-manager-confirm.component.scss',
})
export class DeleteManagerConfirmComponent {

  constructor(public dialogRef: MatDialogRef<DeleteManagerConfirmComponent>) {
  }
  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
