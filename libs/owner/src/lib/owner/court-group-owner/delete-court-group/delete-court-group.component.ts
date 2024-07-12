import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'lib-delete-court-group',
  standalone: true,
  imports: [CommonModule, MatButton, MatDialogActions, MatDialogContent, MatDialogTitle],
  templateUrl: './delete-court-group.component.html',
  styleUrl: './delete-court-group.component.scss',
})
export class DeleteCourtGroupComponent {
  constructor(public dialogRef: MatDialogRef<DeleteCourtGroupComponent>) {
  }
  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
