import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { MatLabel, MatSelect } from '@angular/material/select';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatLine } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  AuthService,
  CourtGroup,
  CourtYard, loadCourtGroupByOwnerId,
  loadCourtGroups,
  loadCourtYards, loadUser,
  selectAllCourtGroups,
  selectAllCourtYards, selectCurrentUser, UserInterface
} from '@org/store';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'lib-court-yard-management',
  standalone: true,
  imports: [CommonModule,
    MatOption,
    MatSelect,
    MatCard,
    MatCardContent,
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatLine,
    MatCardTitle,
    FlexLayoutModule,
    FormsModule
  ],
  templateUrl: './court-yard-management.component.html',
  styleUrl: './court-yard-management.component.scss',
})
export class CourtYardManagementComponent implements OnInit {
  courtGroupOptions$: Observable<CourtGroup[]>;
  selectedCourtGroup?: CourtGroup;
  user$: Observable<UserInterface | null>;
  ownerId = '';
  courtYards$: Observable<CourtYard[]>;
  selectedCourtYard: CourtYard | null = null;

  constructor(private store: Store, private authService: AuthService) {
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups);
    this.courtYards$ = this.store.select(selectAllCourtYards);
    this.user$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourtGroups({ pageNumber: 1, pageSize: 10 })); // Load court groups initially

    // Select the first court group initially
    this.courtGroupOptions$.subscribe(courtGroups => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0]; // Set to the first court group
        this.loadCourtYards(); // Load court yards for the initial selected court group
      }
    });

    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
    }

    this.user$.subscribe(user => {
      this.ownerId = user?.supervisorId || '';
      if (this.ownerId) {
        this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.ownerId, pageNumber: 1, pageSize: 10 }));
      }
    });
  }

  onSelectCourtGroup(selectedGroup: CourtGroup): void {
    this.selectedCourtGroup = selectedGroup;
    this.loadCourtYards(); // Load court yards when court group changes
  }

  loadCourtYards(): void {
    if (this.selectedCourtGroup) {
      this.store.dispatch(loadCourtYards({ courtGroupId: this.selectedCourtGroup.id, pageNumber: 1, pageSize: 10 }));
    }
  }

  toggleDetails(court: CourtYard) {
    this.selectedCourtYard = (this.selectedCourtYard === court) ? null : court;
  }
}
