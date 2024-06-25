import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AuthService,
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

  @Input() user?: UserInterface | null;
  @Output() courtSelected = new EventEmitter<string>();
  courtsGroup$!: Observable<CourtGroup[]>;


  constructor(private store: Store, public dialog: MatDialog) {

  }

  ngOnInit(): void {

    if (this.user && this.user.id) {
      this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.user?.id }));
    }

    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
  }


  onCourtSelected(court: string) {
    this.courtSelected.emit(court);
    console.log(court);
  }


  openDialog() {
    const dialogRef = this.dialog.open(NewCourtGroupComponent, {
      width: '600px',
      data: { userId: this.user?.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.store.dispatch(createCourtGroup({ courtGroup: result }));
      }
    });
  }
}
