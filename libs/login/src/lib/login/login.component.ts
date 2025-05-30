import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@org/store';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { LoginFailedComponent } from './loginFailed.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-login',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatError,
    MatCard,
    MatCardTitle,
    MatCardContent,
    RouterLink, MatIcon
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);
  dialog = inject(MatDialog);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  login(): void {
    const rawForm = this.loginForm.getRawValue();
    this.authService
      .login(rawForm.email, rawForm.password)
      .subscribe({
        error: (error) => {
          // Check for specific Firebase error codes
          if (error.code === 'auth/user-not-found') {
            this.showLoginFailed("sai tài khoản hoặc sai mật khẩu");
          } else {
            this.showLoginFailed('Login failed: ' + (error.message || 'Unknown error'));
          }
        }
      });
  }

  showLoginFailed(message: string): void {
    this.dialog.open(LoginFailedComponent, {
      data: { message },
    });
  }
}
