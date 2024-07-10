import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewHeaderComponent } from './overview-header/overview-header.component';
import { OverviewContentComponent } from './overview-content/overview-content.component';

@Component({
  selector: 'lib-overview-staff',
  standalone: true,
  imports: [CommonModule, OverviewHeaderComponent, OverviewContentComponent],
  templateUrl: './overview-staff.component.html',
  styleUrl: './overview-staff.component.scss',
})
export class OverviewStaffComponent {
  selectedCourtGroupId?: string;

  onCourtGroupSelected(courtGroupId: string): void {
    this.selectedCourtGroupId = courtGroupId;
  }
}

