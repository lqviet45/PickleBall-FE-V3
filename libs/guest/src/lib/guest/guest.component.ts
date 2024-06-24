import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourtGroup, loadCourtGroups, selectAllCourtGroups } from '@org/store';
import { Store } from '@ngrx/store';
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
export class GuestComponent {

}
