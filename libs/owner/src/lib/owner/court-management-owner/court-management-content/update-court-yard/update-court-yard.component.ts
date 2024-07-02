import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-update-court-yard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-court-yard.component.html',
  styleUrl: './update-court-yard.component.scss',
})
export class UpdateCourtYardComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCourtYardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      id: [data.courtYard.id],
      name: [data.courtYard.name, Validators.required],
      courtYardStatus: [this.convertStringToStatus(data.courtYard.courtYardStatus), Validators.required],
      type: [data.courtYard.type, Validators.required]
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  private convertStringToStatus(status: string): string {
    return status === 'Booked' ? '1' : '2';
  }

}
