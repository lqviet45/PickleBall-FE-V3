import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourtGroup } from '@org/store';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'lib-new-court-group',
  standalone: true,
  imports: [CommonModule, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatLabel, MatFormField, MatInput, MatDialogActions, MatButton, MatError, MatDialogClose],
  templateUrl: './new-court-group.component.html',
  styleUrl: './new-court-group.component.scss',
})
export class NewCourtGroupComponent {

  courtGroupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCourtGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.courtGroupForm = this.fb.group({
      name: ['', Validators.required],
      wardName: ['', Validators.required],
      walletId: ['', Validators.required],
      price: [0, Validators.required],
      minSlots: [1, Validators.required],
      maxSlots: [24, Validators.required]
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.courtGroupForm.valid) {
      const courtGroup: CourtGroup = {
        ...this.courtGroupForm.value,
        userId: this.data.userId
      };

      this.dialogRef.close(courtGroup);
    }
  }
}
