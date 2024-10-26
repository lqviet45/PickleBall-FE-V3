import { Component, EventEmitter, HostListener, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { AuthService, loadUser, UserInterface, UserState } from '@org/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { TransactionAdminComponent } from '../transaction-admin/transaction-admin.component';

@Component({
  selector: 'lib-header-admin',
  standalone: true,
  imports: [CommonModule, MatButton, MatIcon, MatIconButton, MatInput, MatMenu, MatMenuItem, MatToolbar, MatToolbarRow, TransactionAdminComponent, MatMenuTrigger],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.scss',
})
export class HeaderAdminComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  user$: Observable<UserInterface | null>;
  avatarUrl = this.authService.currentUserSig()?.photoURL;
  showNotifications = false; // Controls the notification panel visibility

  ngOnInit(): void {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
    }
  }

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  ToggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  constructor(private store: Store<{ user: UserState }>) {
    this.user$ = store.pipe(select(state => state.user.user));
  }

  Profile() {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.router.navigateByUrl(`/user/${firebaseId}`);
    }
  }

  LogOut() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  // Toggle notification panel
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  // Close panel by clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;

    // Check if the target exists and is not part of the notification panel
    if (target && !target.closest('.notification-panel') && !target.closest('.notification-box')) {
      this.showNotifications = false;
    }
  }

}
