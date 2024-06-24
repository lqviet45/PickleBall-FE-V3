import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Observable, Subscription } from 'rxjs';
import { CourtYard, loadCourtYards, selectAllCourtYards } from '@org/store';
import { Store } from '@ngrx/store';


@Component({
  selector: 'lib-court-management-content',
  standalone: true,
  imports: [CommonModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatHeaderRow, MatRow, MatRowDef, MatIconButton, MatIcon, MatCellDef, MatHeaderRowDef],
  templateUrl: './court-management-content.component.html',
  styleUrl: './court-management-content.component.scss'
})
export class CourtManagementContentComponent implements OnInit, OnChanges {


  @Input() courtGroupId!: string;
  displayedColumns: string[] = ['stt', 'name', 'price', 'status', 'action'];
  dataSource: CourtYard[] = [];
  courtYards$: Observable<CourtYard[]>;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {
    this.courtYards$ = this.store.select(selectAllCourtYards);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courtGroupId'] && changes['courtGroupId'].currentValue) {
      this.store.dispatch(loadCourtYards({ courtGroupId: this.courtGroupId }));
      this.subscriptions.add(
        this.courtYards$.subscribe(courtYards => {
          this.dataSource = courtYards;
        })
      );
    }

    }

  ngOnInit(): void {
    //this.store.dispatch(loadCourtYards({ courtGroupId: this.courtGroupId }));
    console.log(this.courtGroupId);
  }



  onDeleteClick(id: string) {
    // this.store.dispatch(deleteCourtGroup({ id }));
  }

  onEditClick(id: string) {
    // this.store.dispatch(editCourtGroup({ id }));
  }
}
