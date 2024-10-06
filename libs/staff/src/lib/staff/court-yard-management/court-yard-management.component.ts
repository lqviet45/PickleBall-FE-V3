import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { MatFormField, MatLabel, MatSelect } from '@angular/material/select';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { MatLine } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  AuthService,
  CourtGroup,
  CourtYard, loadCourtGroupByOwnerId,
  loadCourtYards, loadUser,
  selectAllCourtGroups,
  selectAllCourtYards, selectAllSlots, selectCurrentUser,
  Slots, loadSlots,
  UserInterface
} from '@org/store';
import { Observable} from 'rxjs';
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
    MatInput,
    MatLabel,
    MatList,
    MatListItem,
    MatLine,
    MatCardTitle,
    FlexLayoutModule,
    FormsModule, MatFormField,
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
  slots$: Observable<Slots[]>;
  selectedDate: string = new Date().toISOString().split('T')[0];

  constructor(private store: Store, private authService: AuthService, public dialog: MatDialog) {
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups);
    this.courtYards$ = this.store.select(selectAllCourtYards);
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.slots$ = this.store.select(selectAllSlots);
  }

  ngOnInit(): void {
    // Select the first court group initially
    this.courtGroupOptions$.subscribe(courtGroups => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0];
        this.loadCourtYards();
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
    this.courtYards$.subscribe(courtYards => {
      if (courtYards.length > 0) {
        this.selectedCourtYard = courtYards[0];
        this.loadSlots(this.selectedCourtYard.id, this.selectedDate);
      }
    });
  }
  onSelectCourtGroup(selectedGroup: CourtGroup): void {
    this.selectedCourtGroup = selectedGroup;
    this.loadCourtYards();
  }

  loadCourtYards(): void {
    if (this.selectedCourtGroup) {
      this.store.dispatch(loadCourtYards({ courtGroupId: this.selectedCourtGroup.id, pageNumber: 1, pageSize: 10 }));
    }
  }

  onCourtYardSelect(courtYard: CourtYard): void {
    if (this.selectedCourtYard === courtYard) {
      this.selectedCourtYard = null; // Close details if already selected
    } else {
      this.selectedCourtYard = courtYard;
      this.loadSlots(courtYard.id, this.selectedDate);
    }
  }

  loadSlots(courtYardId: string, selectedDate: string): void {
    this.store.dispatch(loadSlots({ courtYardId, dateBooking: selectedDate }));
  }

  onDateChange(newDate: string): void {
    this.selectedDate = newDate;  // Directly assign the new date
    if (this.selectedCourtYard) {
      this.loadSlots(this.selectedCourtYard.id, this.selectedDate);  // Reload slots with the new date
    }
  }
}
