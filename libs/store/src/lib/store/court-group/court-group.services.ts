import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourtGroup } from './court-group.model';

@Injectable({
  providedIn: 'root'
})
export class CourtGroupService {
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {}

  getCourtGroups(): Observable<CourtGroup[]> {
    return this.http.get<{ value: CourtGroup[] }>(`${this.apiUrl}/2053852A-E44F-483E-E323-08DC913FE63F/court-groups`)
      .pipe(map(response => response.value));
  }

  getCourtsByOwnerId(userId: string): Observable<CourtGroup[]> {
    return this.http.get<{ value: CourtGroup[] }>(`${this.apiUrl}/${userId}/court-groups`)
      .pipe(map(response => response.value));
  }

  createCourtGroup(courtGroup: CourtGroup): Observable<CourtGroup> {
    return this.http.post<CourtGroup>(`${this.apiUrl}/${courtGroup.userId}/court-groups`, courtGroup);
  }

}
