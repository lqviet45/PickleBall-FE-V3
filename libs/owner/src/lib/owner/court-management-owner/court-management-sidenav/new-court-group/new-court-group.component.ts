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
  selectedFile: File | null = null;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewCourtGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    //console.log(data)
    this.courtGroupForm = this.fb.group({
      userId: [data.userId, Validators.required],
      name: ['', Validators.required],
      wardName: ['', Validators.required],
      price: [0, Validators.required],
      minSlots: [1, Validators.required],
      maxSlots: [24, Validators.required],
      mediaUrl: ['']
    });
    //console.log(this.courtGroupForm.value)
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.courtGroupForm.valid) {
      this.dialogRef.close({
        formData: this.courtGroupForm.value,
        file: this.selectedFile
      });
      //console.log(this.courtGroupForm.value);
    }
  }

}
