import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-delete-comfirm',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './delete-comfirm.component.html',
  styleUrl: './delete-comfirm.component.scss',
})
export class DeleteComfirmComponent {

  constructor(public dialogRef: MatDialogRef<DeleteComfirmComponent>) {
  }
  onNoClick() {
    this.dialogRef.close(false);
  }

  onYesClick() {
    this.dialogRef.close(true);
  }
}
