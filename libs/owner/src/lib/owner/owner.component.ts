import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { SidenavOwnerComponent } from './sidenav-owner/sidenav-owner.component';
import { HeaderOwnerComponent } from './header-owner/header-owner.component';
import { OverviewOwnerComponent } from './overview-owner/overview-owner.component';
import { CourtManagementOwnerComponent } from './court-management-owner/court-management-owner.component';

@Component({
  selector: 'lib-owner',
  standalone: true,
  imports: [CommonModule, MatDrawerContainer, SidenavOwnerComponent, HeaderOwnerComponent, OverviewOwnerComponent, MatDrawer, MatDrawerContent, CourtManagementOwnerComponent],
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.scss',
})
export class OwnerComponent implements OnInit{

  currentView = 'overview-owner';
  sideBarOpen = true;

  setView(view: string) {
    this.currentView = view;
  }

  constructor() {
    // constructor
  }

  ngOnInit(): void {
        console.log('OwnerComponent');
  }

  sideBarToggled() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
