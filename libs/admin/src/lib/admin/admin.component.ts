import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@org/store';
import { LoginComponent } from '@org/login';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { HeaderOwnerComponent } from '@org/owner';
import { SidenavAdminComponent } from './sidenav-admin.component';

@Component({
  selector: 'lib-admin',
  standalone: true,
  imports: [CommonModule,
    LoginComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    SidenavAdminComponent,
    HeaderOwnerComponent,
    SidenavAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit{
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
