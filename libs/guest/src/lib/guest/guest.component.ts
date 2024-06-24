import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CourtGroup, loadCourtGroups, selectAllCourtGroups } from '@org/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-guest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss',
})
export class GuestComponent implements OnInit{

  selectedCourtGroup: CourtGroup | undefined; // Hold the selected court group
  courtGroupOptions$: Observable<CourtGroup[]>;
  courtGroups$: Observable<CourtGroup[]>;
  //courtYards$: Observable<CourtYard[]>;
  //selectedCourtYard: CourtYard | null = null;
    ngOnInit(): void {
      this.store.dispatch(loadCourtGroups());
      console.log(this.courtGroups$.subscribe(
        courtGroups => console.log(courtGroups)
      ))
    }

  constructor(private store: Store) {
    this.courtGroups$ = this.store.select(selectAllCourtGroups);
    // this.courtYards$ = this.store.select(selectAllCourtYards);
    this.courtGroupOptions$ = this.store.select(selectAllCourtGroups)
  }

}
