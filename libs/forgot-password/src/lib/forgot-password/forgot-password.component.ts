import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@org/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon'; // Import Router for navigation

@Component({
  selector: 'lib-forgot-password',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardTitle, MatCardContent, ReactiveFormsModule, MatFormField, MatInput, MatButton, MatLabel, MatError, MatIcon, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  snackBar = inject(MatSnackBar);
  router = inject(Router); // Inject Router
  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    const email = this.forgotPasswordForm.get('email')?.value;
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.snackBar.open('Password reset link sent to your email', 'Close', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackBar.open('Failed to send password reset email. Try again later.', 'Close', { duration: 5000 });
        console.error('Password reset error:', error);
      }
    });
  }
}
