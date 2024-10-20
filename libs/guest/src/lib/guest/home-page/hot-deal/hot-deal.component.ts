import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourtGroup } from '@org/store';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'lib-hot-deal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hot-deal.component.html',
  styleUrl: './hot-deal.component.scss',
})
export class HotDealComponent {
  @Input() courtGroups: CourtGroup[] = [];
  @Input() error: string | null = null;
}
