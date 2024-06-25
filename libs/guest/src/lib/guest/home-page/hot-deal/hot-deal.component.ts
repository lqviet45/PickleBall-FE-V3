import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourtGroup, selectAllCourtGroups, selectCourtGroupError } from '@org/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-hot-deal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hot-deal.component.html',
  styleUrl: './hot-deal.component.scss',
})
export class HotDealComponent {
  courtGroup$: Observable<CourtGroup[]>
  error$: Observable<any>
  constructor(private store: Store) {
    this.courtGroup$ = this.store.select(selectAllCourtGroups);
    this.error$ = this.store.select(selectCourtGroupError)
    console.log(this.courtGroup$)
  }

}
