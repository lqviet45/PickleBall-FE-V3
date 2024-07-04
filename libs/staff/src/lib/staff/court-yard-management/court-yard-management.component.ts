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
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
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
  selectedCourtGroup: CourtGroup | undefined;
  courtGroupOptions$: Observable<CourtGroup[]>;
  courtYards$: Observable<CourtYard[]>;
  selectedCourtYard: CourtYard | null = null;

  constructor(private store: Store) {
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups);
    this.courtYards$ = this.store.select(selectAllCourtYards);
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourtGroups({pageNumber: 1, pageSize: 10})); // Load court groups initially

    // Select the first court group initially
    this.courtGroupOptions$.subscribe(courtGroups => {
      if (courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0];
        this.loadCourtYards(this.selectedCourtGroup.id); // Load court yards for the first group
      }
    });
  }

  // Method to load court yards for a given court group ID
  loadCourtYards(courtGroupId: string): void {
    this.store.dispatch(loadCourtYards({ courtGroupId, pageNumber: 1, pageSize: 10 }));
  }

  // Toggle details of the selected court yard
  toggleDetails(court: CourtYard) {
    this.selectedCourtYard = (this.selectedCourtYard === court) ? null : court;
  }

  // Handle change in selected court group
  onCourtGroupChange(event: any): void {
    const selectedGroupId = event.value.id;
    this.loadCourtYards(selectedGroupId); // Load court yards when court group changes
  }
}
