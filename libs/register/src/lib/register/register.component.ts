import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { RegisterState } from '@org/store';
import * as RegisterActions from '@org/store';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lib-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormField, MatInput, MatError, MatButton, MatLabel, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private store: Store<RegisterState>, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName, fullName, location, role } = this.registerForm.value;
      this.store.dispatch(RegisterActions.register({ email, password, firstName, lastName, fullName, location, role }));
      this.store.pipe(select(RegisterActions.registerSuccess)).subscribe((success) => {
        if (success) {
          this.showSnackBar('Successfully');
          this.router.navigate(['/login']); // Navigate to login page
        }
      });
    }
  }
  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
