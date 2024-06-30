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
import {
  CourtYard,
  createCourtYard, deleteCourtYard,
  loadCourtYards,
  selectAllCourtYards,
  selectCourtYardActions, updateCourtYard
} from '@org/store';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AddCourtYardComponent } from './add-court-yard/add-court-yard.component';
import { UpdateCourtYardComponent } from './update-court-yard/update-court-yard.component';
import { DeleteComfirmComponent } from './delete-confirm/delete-comfirm.component';


@Component({
  selector: 'lib-court-management-content',
  standalone: true,
  imports: [CommonModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatHeaderRow, MatRow, MatRowDef, MatIconButton, MatIcon, MatCellDef, MatHeaderRowDef],
  templateUrl: './court-management-content.component.html',
  styleUrl: './court-management-content.component.scss'
})
export class CourtManagementContentComponent implements OnInit, OnChanges {


  @Input() courtGroupId!: string;
  displayedColumns: string[] = ['stt', 'name', 'status', 'action'];
  dataSource: CourtYard[] = [];
  courtYards$: Observable<CourtYard[]>;
  courtYardActions$: Observable<boolean>;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private store: Store,
    private dialog: MatDialog
    ) {
    this.courtYards$ = this.store.select(selectAllCourtYards);
    this.courtYardActions$ = this.store.select(selectCourtYardActions);
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
    //console.log(this.courtGroupId);

    this.courtYardActions$.subscribe((action) => {
      if (action) {
        this.store.dispatch(loadCourtYards({ courtGroupId: this.courtGroupId }));
      }

    })

  }



  onDeleteClick(id: string) {
    const dialogRef = this.dialog.open(DeleteComfirmComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteCourtYard({id: id}));
      }
    });

  }

  onEditClick(id: string) {
    const dialogRef = this.dialog.open(UpdateCourtYardComponent, {
      width: '400px',
      data: { courtYard: this.dataSource.find(courtYard => courtYard.id === id) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updateCourtYard({ courtYard: result }));
      }
    });

  }

  onCreateCourtYard() {
    const dialogRef = this.dialog.open(AddCourtYardComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //console.log(result);
        this.store.dispatch(createCourtYard({ courtGroupId: this.courtGroupId, courtYardName: result }));
      }
    });

  }
}
