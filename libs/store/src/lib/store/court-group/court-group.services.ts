import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourtGroup } from './court-group.model';

@Injectable({
  providedIn: 'root'
})
export class CourtGroupService {
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/users';
  private getCourtGroupsByNameAndCity = 'https://pickleballapp.azurewebsites.net/api'
  constructor(private http: HttpClient) {}

  getCourtGroups(): Observable<CourtGroup[]> {
    return this.http.get<{ value: CourtGroup[] }>(`${this.apiUrl}/2053852A-E44F-483E-E323-08DC913FE63F/court-groups`)
      .pipe(map(response => response.value));
  }

  getCourtsByOwnerId(userId: string): Observable<CourtGroup[]> {
    return this.http.get<{ value: CourtGroup[] }>(`${this.apiUrl}/${userId}/court-groups`)
      .pipe(map(response => response.value));
  }
  searchCourtGroups(name: string, cityName: string): Observable<CourtGroup[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('Name', name);
    }
    if (cityName) {
      params = params.set('CityName', cityName);
    }
    return this.http.get<{ value: CourtGroup[] }>(`${this.getCourtGroupsByNameAndCity}/court-groups/search`, { params })
      .pipe(map(response => {
        console.log('API response:', response);
        return response.value;
      }));
  }
}
