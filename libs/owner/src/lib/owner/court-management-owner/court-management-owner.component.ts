import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtManagementContentComponent } from './court-management-content/court-management-content.component';
import { CourtManagementSidenavComponent } from './court-management-sidenav/court-management-sidenav.component';
import { Observable } from 'rxjs';
import { CourtGroup, loadCourtGroupByOwnerId, selectAllCourtGroups } from '@org/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-court-management-owner',
  standalone: true,
  imports: [CommonModule, CourtManagementContentComponent, CourtManagementSidenavComponent],
  templateUrl: './court-management-owner.component.html',
  styleUrl: './court-management-owner.component.scss',
})
export class CourtManagementOwnerComponent implements OnInit{

  selectedCourtGroupId!: string;
  courtGroups$: Observable<CourtGroup[]>;

  constructor(private store: Store) {
    this.courtGroups$ = this.store.select(selectAllCourtGroups);
  }

  ngOnInit(): void {
    const userId = '2053852a-e44f-483e-e323-08dc913fe63f';
    this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: userId }));

    // Subscribe to courtGroups$ to get the first court group ID
    this.courtGroups$.subscribe(courtGroups => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroupId = courtGroups[0].id;
      }
    });
  }

  onCourtGroupSelected(court: string) {
    this.selectedCourtGroupId = court;
  }

}
