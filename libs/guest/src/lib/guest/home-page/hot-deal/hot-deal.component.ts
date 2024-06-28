import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
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
  @Input() courtGroups: CourtGroup[] | null = [];
  @Input() error: string | null = null;

  get sortedCourtGroups(): CourtGroup[] {
    return this.courtGroups
      ? [...this.courtGroups].sort((a, b) => (b.price || 0) - (a.price || 0))
      : [];
  }

}
