import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  CourtGroup, createCourtGroup,
  loadCourtGroupByOwnerId,
  selectAllCourtGroups,
  UserInterface
} from '@org/store';
import { MatDialog } from '@angular/material/dialog';
import { NewCourtGroupComponent } from './new-court-group/new-court-group.component';



@Component({
  selector: 'lib-court-management-sidenav',
  standalone: true,
  imports: [CommonModule, MatIcon, NgOptimizedImage, MatButton, MatProgressBar, MatProgressSpinner],
  templateUrl: './court-management-sidenav.component.html',
  styleUrl: './court-management-sidenav.component.scss',
})
export class CourtManagementSidenavComponent implements OnInit{

  user$ = Observable<UserInterface>
  private userId = 'b0d5db25-6d0f-43b8-5600-08dc94b9501f';
  @Output() courtSelected = new EventEmitter<string>();
  courtsGroup$!: Observable<CourtGroup[]>;

  constructor(private store: Store, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId }));
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
  }


  onCourtSelected(court: string) {
    this.courtSelected.emit(court);
    console.log(court);
  }


  openDialog() {
    const dialogRef = this.dialog.open(NewCourtGroupComponent, {
      width: '600px',
      data: { userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(createCourtGroup({ courtGroup: result }));
      }
    });
  }
}
