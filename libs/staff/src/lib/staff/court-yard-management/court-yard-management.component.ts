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
  CourtGroup,
  CourtYard,
  loadCourtGroups,
  loadCourtYards,
  selectAllCourtGroups,
  selectAllCourtYards
} from '@org/store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

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
  selectedCourtGroup: CourtGroup | undefined; // Hold the selected court group
  courtGroupOptions$: Observable<CourtGroup[]>;
  courtGroups$: Observable<CourtGroup[]>;
  courtYards$: Observable<CourtYard[]>;
  selectedCourtYard: CourtYard | null = null;

  constructor(private store: Store) {
    this.courtGroups$ = this.store.select(selectAllCourtGroups);
    this.courtYards$ = this.store.select(selectAllCourtYards);
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups)
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourtGroups()); // Dispatch action to load courts
    this.courtGroupOptions$.subscribe(courtGroups => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0]; // Set the first item initially
      }
    });
    /*this.courtYards$.pipe(
      tap(courtGroups => {
        if (courtGroups.length > 0) {
          this.selectedCourtGroupId = courtGroups[0].id; // Select the first court group initially
          this.store.dispatch(loadCourtYards({ courtGroupId: this.selectedCourtGroupId }));
        }
      })
    ).subscribe();*/
    // Example: Dispatch loadCourtYards action for a known courtGroupId
    const courtGroupId = '28a0d866-0396-4449-a58d-088725977029';
    this.store.dispatch(loadCourtYards({ courtGroupId }));
  }


  toggleDetails(court: CourtYard) {
    if (this.selectedCourtYard === court) {
      this.selectedCourtYard = null; // Deselect if already selected
    } else {
      this.selectedCourtYard = court; // Select the clicked court
    }
  }

  openAddDialog() {
    // Implementation for opening add dialog
  }
}
