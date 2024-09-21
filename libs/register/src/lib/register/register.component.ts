import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { RegisterState, selectRegisterError, selectRegisterLoading, selectRegisterSuccess } from '@org/store';
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
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  errorMessage: string | null = null;
  loading = false;

  ngOnInit() {
    // Reset success state when the component is initialized
    this.store.dispatch(RegisterActions.resetRegisterState());
  }
  constructor(private fb: FormBuilder, private store: Store<RegisterState>, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });

    // Subscribe to error state
    this.store.pipe(select(selectRegisterError)).subscribe(error => {
      if (error) {
        this.errorMessage = error;
        this.showSnackBar('Registration failed. Please try again.');
      }
    });

    this.store.pipe(select(selectRegisterSuccess)).subscribe(success => {
      if (success) {
        this.showSnackBar('Registration successful!');
        this.router.navigate(['/login']);  // Redirect to login page on success
      }
    });

    // Subscribe to loading state if needed for button state
    this.store.pipe(select(selectRegisterLoading)).subscribe(loading => {
      this.loading = loading;
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { email, password, firstName, lastName, location } = this.registerForm.value;
      const fullName = `${firstName} ${lastName}`;
      const role = 3; // Assuming role is fixed for now

      // Dispatch the register action
      this.store.dispatch(RegisterActions.register({ email, password, firstName, lastName, fullName, location, role }));
    }
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
