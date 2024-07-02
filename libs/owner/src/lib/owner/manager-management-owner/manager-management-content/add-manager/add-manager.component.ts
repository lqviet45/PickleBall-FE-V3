import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-add-manager',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.scss',
})
export class AddManagerComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddManagerComponent>
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      //console.log(formValue);
      this.dialogRef.close(formValue);
    }
  }
}
