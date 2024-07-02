import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-add-court-yard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-court-yard.component.html',
  styleUrl: './add-court-yard.component.scss',
})
export class AddCourtYardComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCourtYardComponent>,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required]
    });
  }
  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.name);
    }
  }
}
