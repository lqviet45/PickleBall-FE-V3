import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-login-failed',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Error</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">OK</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      h2 {
        color: red;
      }
      mat-dialog-content {
        margin: 20px 0;
      }
    `
  ],
  imports: [MatDialogModule, MatButtonModule]
})
export class LoginFailedComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<LoginFailedComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
