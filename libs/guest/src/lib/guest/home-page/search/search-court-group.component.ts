
import { Component, OnInit } from '@angular/core';
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
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { HotDealComponent } from '../hot-deal/hot-deal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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
    MatDatepickerModule, MatIcon, MatIconButton, HotDealComponent, MatPaginator
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

  constructor(private store: Store<{ city: CityState, courtGroups: { courtGroups: CourtGroup[], error: any } }>) {
    this.cities$ = this.store.select(state => state.city.cities);
    this.courtGroups$ = this.store.select(selectAllCourtGroups)
    this.error$ = this.store.select(selectCourtGroupError);
  }

  ngOnInit() {
    this.store.dispatch(loadCities());
    // Trigger search with default values on page load
    this.onSearch();
  }

  onSearch() {
    this.store.dispatch(searchCourtGroups({
      name: this.searchQuery || '',
      cityName: this.selectedCity || '',
      pageNumber: 1,
      pageSize: 8
    }));
  }
}

