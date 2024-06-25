
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import {MatOption, MatSelect} from "@angular/material/select";
import { MatInput, MatInputModule } from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { Store} from '@ngrx/store';
import {
  CityState,
  CourtGroup,
  loadCities,
  searchCourtGroups,
  selectAllCourtGroups,
  selectCourtGroupError
} from '@org/store';
import { provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'lib-search-court-group',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,
    MatFormField,
    MatSelect,
    MatInput,
    MatOption,
    FormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatLabel,
    MatHint,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './search-court-group.component.html',
  styleUrl: './search-court-group.component.scss',
})
export class SearchCourtGroupComponent implements OnInit{
  courtGroups$: Observable<CourtGroup[]>;
  error$: Observable<any>;

  searchQuery = '';
  selectedCity = '';
  cities$: Observable<string[]>;
  nop: string[] = ['2', '3', '4'];
  selectedDate: string;
  constructor(private store: Store<{ city: CityState, courtGroups: { courtGroups: CourtGroup[], error: any } }>) {
    const today = new Date();
    this.selectedDate = today.toISOString().slice(0, 10);
    this.cities$ = this.store.select(state => state.city.cities);
    this.courtGroups$ = this.store.select(selectAllCourtGroups);
    this.error$ = this.store.select(selectCourtGroupError);
    console.log(this.courtGroups$)
  }

  ngOnInit() {
    this.store.dispatch(loadCities());
  }

  onSearch() {
    console.log('Selected City:', this.selectedCity);
    this.store.dispatch(searchCourtGroups({ name: this.searchQuery, cityName: this.selectedCity }));
    this.courtGroups$.subscribe(courtGroups => {
      console.log('Court Groups:', courtGroups);
    });
  }
}

