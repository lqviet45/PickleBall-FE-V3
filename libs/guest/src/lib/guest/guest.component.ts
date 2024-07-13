import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  CourtGroup,
  CourtGroupState,
  loadCourtGroups,
  searchCourtGroups,
  selectAllCourtGroups,
} from '@org/store';
import { select, Store } from '@ngrx/store';
import { HeaderComponent } from './header/header.component';
import { IntroduceComponent } from './home-page/introduce/introduce.component';
import { SearchCourtGroupComponent } from './home-page/search/search-court-group.component';
import { HotDealComponent } from './home-page/hot-deal/hot-deal.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'lib-guest',
  standalone: true,
  imports: [CommonModule, HeaderComponent, IntroduceComponent, SearchCourtGroupComponent, HotDealComponent, FooterComponent],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent implements OnInit{
  courtGroups$: Observable<CourtGroup[]>;

  constructor(private store: Store<CourtGroupState>) {
    this.courtGroups$ = this.store.pipe(select(selectAllCourtGroups));
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourtGroups({pageNumber: 1, pageSize: 10}));
  }

}
