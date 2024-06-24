import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatNavList } from '@angular/material/list';
import { LoginComponent } from '@org/login';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { SidenavStaffComponent } from './sidenav-staff/sidenav-staff.component';
import { OverviewStaffComponent } from './overview-staff/overview-staff.component';
import { HeaderOwnerComponent } from '@org/owner';
import { CourtYardManagementComponent } from './court-yard-management/court-yard-management.component';
import { AuthService } from '@org/store';
@Component({
  selector: 'lib-staff',
  standalone: true,
  imports: [CommonModule,
    MatIcon,
    MatListItem,
    MatNavList,
    NgOptimizedImage,
    LoginComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    SidenavStaffComponent,
    OverviewStaffComponent,
    HeaderOwnerComponent, CourtYardManagementComponent
  ],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss',
})
export class StaffComponent implements OnInit {
  authService = inject(AuthService)

  currentView = 'overview';
  sideBarOpen = true;

  sideBarToggled() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  setView(view: string) {
    this.currentView = view;
  }
  ngOnInit() {
    this.authService.user$.subscribe(user =>{
      if(user){
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          firebaseId: user.uid!,
        })
      } else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }
  logout(): void{
    this.authService.logout()
  }
}
