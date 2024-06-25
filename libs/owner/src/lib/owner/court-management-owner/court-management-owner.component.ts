import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtManagementContentComponent } from './court-management-content/court-management-content.component';
import { CourtManagementSidenavComponent } from './court-management-sidenav/court-management-sidenav.component';
import { Observable} from 'rxjs';
import {
  AuthService,
  CourtGroup,
  loadCourtGroupByOwnerId,
  loadUser,
  selectAllCourtGroups,
  UserInterface,
  selectCurrentUser
} from '@org/store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'lib-court-management-owner',
  standalone: true,
  imports: [CommonModule, CourtManagementContentComponent, CourtManagementSidenavComponent],
  templateUrl: './court-management-owner.component.html',
  styleUrl: './court-management-owner.component.scss',
})
export class CourtManagementOwnerComponent implements OnInit{

  authService = inject(AuthService);

  selectedCourtGroupId!: string;
  courtGroups$: Observable<CourtGroup[]>;
  user$: Observable<UserInterface | null>;

  constructor(private store: Store) {
    this.courtGroups$ = this.store.select(selectAllCourtGroups);
    this.user$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
    } else {
      console.error('Error in court-management-owner line 43');
    }

    this.user$.subscribe(user => {
      //console.log('Current User:', user);
      if (user && user.id) {
        this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: user.id }));
        //console.log('User ID:', user.id);
      }
    });

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
