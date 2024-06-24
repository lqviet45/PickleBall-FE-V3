import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourtGroup, loadCourtGroupByOwnerId, selectAllCourtGroups } from '@org/store';


@Component({
  selector: 'lib-court-management-sidenav',
  standalone: true,
  imports: [CommonModule, MatIcon, NgOptimizedImage, MatButton, MatProgressBar, MatProgressSpinner],
  templateUrl: './court-management-sidenav.component.html',
  styleUrl: './court-management-sidenav.component.scss',
})
export class CourtManagementSidenavComponent implements OnInit{

  private userId = '2053852a-e44f-483e-e323-08dc913fe63f';
  @Output() courtSelected = new EventEmitter<string>();
  courtsGroup$!: Observable<CourtGroup[]>;

  constructor(private store: Store) {


  }

  ngOnInit(): void {
    this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId }));
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
  }


  onCourtSelected(court: string) {
    this.courtSelected.emit(court);
    console.log(court);
  }

}
