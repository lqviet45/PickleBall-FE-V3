import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, loadUser, UserInterface, UserState } from '@org/store';
import { select, Store } from '@ngrx/store';


@Component({
  selector: 'lib-header-owner',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, NgOptimizedImage, MatButton, MatIconButton, MatInput, MatMenuTrigger, MatMenu, MatMenuItem],
  templateUrl: './header-owner.component.html',
  styleUrl: './header-owner.component.scss',
})
export class HeaderOwnerComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  user$: Observable<UserInterface | null>;
  avatarUrl = this.authService.currentUserSig()?.photoURL;
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
}
