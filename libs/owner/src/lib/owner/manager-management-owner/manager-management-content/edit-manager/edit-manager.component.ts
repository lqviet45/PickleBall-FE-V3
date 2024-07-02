import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { loadUserById, selectUserById, UserInterface } from '@org/store';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'lib-edit-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-manager.component.html',
  styleUrl: './edit-manager.component.scss',
})
export class EditManagerComponent implements OnInit{

  userForm: FormGroup;
  user$: Observable<UserInterface | null>

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store
  ) {

    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: [''],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.user$ = this.store.pipe(select(selectUserById(data.managerId)));

    this.user$.subscribe(user => {
      if (user) {
        this.userForm.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          location: user.location,
          email: user.email
        });
      }
    });

  }

  ngOnInit(): void {
    this.store.dispatch(loadUserById({ id: this.data.managerId }));
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
