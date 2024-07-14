import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import {
  CityState,
  CourtGroup,
  loadCities,
  searchCourtGroups,
  selectAllCourtGroups,
  selectCourtGroupError
} from '@org/store';
import { Store } from '@ngrx/store';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatFormField } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'lib-view-courtgroup',
  standalone: true,
  imports: [CommonModule, MatIcon, MatPaginator, MatFormField, MatOption, MatSelect, FormsModule],
  templateUrl: './view-courtgroup.component.html',
  styleUrl: './view-courtgroup.component.scss',
})
export class ViewCourtgroupComponent implements OnInit {
  courtGroups$: Observable<CourtGroup[]>;
  error$: Observable<any>;

  searchQuery = '';
  selectedCity: string | null = null;
  cities$: Observable<string[]>;

  constructor(private store: Store<{ city: CityState, courtGroups: { courtGroups: CourtGroup[], error: any } }>) {
    this.cities$ = this.store.select(state => state.city.cities);
    this.courtGroups$ = this.store.select(selectAllCourtGroups);
    this.error$ = this.store.select(selectCourtGroupError);
  }

  ngOnInit() {
    this.store.dispatch(loadCities());
    this.onSearch();
  }

  onSearch() {
    this.store.dispatch(searchCourtGroups({
      name: this.searchQuery,
      cityName: this.selectedCity ?? '', // Use an empty string if selectedCity is null or undefined
      pageNumber: 1,
      pageSize: 16
    }));
  }

  onCityChange() {
    this.onSearch();
  }

}
