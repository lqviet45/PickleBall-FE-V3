import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { SidenavOwnerComponent } from './sidenav-owner/sidenav-owner.component';
import { HeaderOwnerComponent } from './header-owner/header-owner.component';
import { OverviewOwnerComponent } from './overview-owner/overview-owner.component';
import { CourtManagementOwnerComponent } from './court-management-owner/court-management-owner.component';
import { AuthService } from '@org/store';
import { LoginComponent } from '@org/login';

@Component({
  selector: 'lib-owner',
  standalone: true,
  imports: [CommonModule, MatDrawerContainer, SidenavOwnerComponent, HeaderOwnerComponent, OverviewOwnerComponent, MatDrawer, MatDrawerContent, CourtManagementOwnerComponent, LoginComponent],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss',
})
export class OwnerComponent implements OnInit{

  authService = inject(AuthService);
  currentView = 'overview-owner';
  sideBarOpen = true;

  setView(view: string) {
    this.currentView = view;
  }

  constructor() {
    // constructor
  }

  ngOnInit(): void {
      this.authService.user$.subscribe(user => {
        if(user) {
          this.authService.currentUserSig.set({
            email: user.email!,
            username: user.displayName!,
            firebaseId: user.uid!,
            photoURL: user.photoURL!,
          });
        } else {
          this.authService.currentUserSig.set(null);
        }
      });
  }

  sideBarToggled() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
