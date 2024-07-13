import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  AuthService,
  CourtGroup, loadCourtGroupWithRevenueByOwnerId, loadUser,
  PagedResponse,
  selectAllCourtGroups,
  selectCourtGroupPagedResponse,
  selectCurrentUser,
  UserInterface
} from '@org/store';
import { select, Store } from '@ngrx/store';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'lib-court-group-revenue',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './court-group-revenue.component.html',
  styleUrl: './court-group-revenue.component.scss',
})
export class CourtGroupRevenueComponent implements OnInit{

  courtsGroup$: Observable<CourtGroup[]>;
  userId = '';
  user$: Observable<UserInterface | null>;
  pagedResponse$: Observable<PagedResponse<CourtGroup> | null>;
  pageNumber = 1;
  pageSize = 4;
  totalItems = 0;
  totalPages = 0;
  courtGroups: CourtGroup[] = [];
  chooseMonth: string
  chooseYear : string
  chooseMonthYear: string;


  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.user$ = store.pipe(select(selectCurrentUser));
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
    this.pagedResponse$ = this.store.select(selectCourtGroupPagedResponse);

    const now = new Date();
    this.chooseMonth = ('0' + (now.getMonth() + 1)).slice(-2);
    this.chooseYear = now.getFullYear().toString();
    this.chooseMonthYear = `${this.chooseYear}-${this.chooseMonth}`;
  }

  ngOnInit(): void {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
    }
    this.user$.subscribe(
      user => {
        this.userId = user?.id || '';
        this.loadCourtGroupWithRevenues();
      }
    );

    this.courtsGroup$.subscribe(courtGroups => {
      this.courtGroups = courtGroups;
    });

    this.pagedResponse$.subscribe(pagedResponse => {
      if (pagedResponse) {
        this.totalItems = pagedResponse.totalCount;
        this.totalPages = pagedResponse.totalPages;
      }
    });

  }

  loadCourtGroupWithRevenues() {
    this.store.dispatch(loadCourtGroupWithRevenueByOwnerId({
      ownerId: this.userId, month: this.chooseMonth, year: this.chooseYear, pageNumber: this.pageNumber, pageSize: this.pageSize
    }));
  }

  onMonthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const [year, month] = input.value.split('-');
      this.chooseYear = year;
      this.chooseMonth = month;
      this.loadCourtGroupWithRevenues();
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadCourtGroupWithRevenues();
    }
  }

}
