import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtManagementContentComponent } from './court-management-content/court-management-content.component';
import { CourtManagementSidenavComponent } from './court-management-sidenav/court-management-sidenav.component';

@Component({
  selector: 'lib-court-management-owner',
  standalone: true,
  imports: [CommonModule, CourtManagementContentComponent, CourtManagementSidenavComponent],
  templateUrl: './court-management-owner.component.html',
  styleUrl: './court-management-owner.component.scss',
})
export class CourtManagementOwnerComponent {


  selectedCourtGroupId!: string;
  onCourtGroupSelected(court: string) {
    this.selectedCourtGroupId = court;
  }

}
