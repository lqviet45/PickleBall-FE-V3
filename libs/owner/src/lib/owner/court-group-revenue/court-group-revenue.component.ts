import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  AuthService,
  CourtGroup, loadCourtGroupWithRevenueByOwnerId, loadUser,
  selectAllCourtGroups,
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
  pageNumber = 1;
  courtGroups: CourtGroup[] = [];
  chooseMonth: string;
  chooseYear: string;
  chooseMonthYear: string;

  constructor(
    private store: Store,
    private authService: AuthService
  ) {
    this.user$ = store.pipe(select(selectCurrentUser));
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);

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
        if (this.userId) {
          this.loadCourtGroupWithRevenues();
        }
      }
    );
  }

  loadCourtGroupWithRevenues() {
    this.store.dispatch(loadCourtGroupWithRevenueByOwnerId({
      ownerId: this.userId, month: this.chooseMonth, year: this.chooseYear
    }));
  }

  onMonthChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const [year, month] = input.value.split('-');
      this.chooseYear = year;
      this.chooseMonth = month;
      this.chooseMonthYear = input.value; // Update the displayed value
      this.pageNumber = 1; // Reset to first page when month changes
      this.loadCourtGroupWithRevenues();
    }
  }

}
