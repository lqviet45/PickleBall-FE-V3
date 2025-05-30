import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourtGroup } from './court-group.model';
import { PagedResponse } from '../PagedResponse.model';

@Injectable({
  providedIn: 'root'
})
export class CourtGroupService {
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/users';
  private courtGrApiUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups';
  private getCourtGroupsByNameAndCity = 'https://pickleballapp.azurewebsites.net/api'

  private courtGroupSource = new BehaviorSubject<CourtGroup | null>(null);
  currentCourtGroup = this.courtGroupSource.asObservable();

  constructor(private http: HttpClient) {}

  // getCourtGroups(): Observable<CourtGroup[]> {
  //   return this.http.get<{ value: CourtGroup[] }>(`${this.apiUrl}/18e3a373-c160-4510-733e-08dc94fc4248/court-groups`)
  //     .pipe(map(response => response.value));
  // }

  getCourtGroups(pageNumber: number, pageSize: number): Observable<PagedResponse<CourtGroup>> {
    let params = new HttpParams();
    params = params.set('PageNumber', pageNumber.toString());
    params = params.set('PageSize', pageSize.toString());

    return this.http.get< {value: PagedResponse<CourtGroup>} >(this.courtGrApiUrl, {params})
      .pipe(map(response => {
        return response.value;
      }));
  }

  getCourtsByOwnerId(userId: string, pageNumber: number, pageSize: number): Observable<PagedResponse<CourtGroup>> {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('PageNumber', pageNumber.toString());
    }
    if (pageSize) {
      params = params.set('PageSize', pageSize.toString());
    }
    return this.http.get< {value: PagedResponse<CourtGroup>} >(`${this.apiUrl}/${userId}/court-groups`, {params})
      .pipe(map(response => {
        //console.log(response.value)
        this.courtGroupSource.next(response.value.items[0]);
        //console.log('courtGroupSource:', this.courtGroupSource);
        return response.value;
      }));

  }
  searchCourtGroups(name: string, cityName: string, pageNumber: number, pageSize: number): Observable<PagedResponse<CourtGroup>> {
    let params = new HttpParams();
    if (name) {
      params = params.set('Name', name);
    }
    if (cityName) {
      params = params.set('CityName', cityName);
    }
    params = params.set('PageNumber', pageNumber.toString());
    params = params.set('PageSize', pageSize.toString());
    return this.http.get<{ value: PagedResponse<CourtGroup> }>(`${this.getCourtGroupsByNameAndCity}/court-groups/search`, { params })
      .pipe(map(response => {
        //console.log('API response:', response);
        return response.value;
      }));
  }

  createCourtGroup(courtGroup: CourtGroup): Observable<CourtGroup> {
    //console.log('user id', courtGroup);
    return this.http.post<CourtGroup>(`${this.courtGrApiUrl}`, courtGroup);
  }

  deleteCourtGroup(courtGroupId: string): Observable<any> {
    return this.http.delete(`${this.courtGrApiUrl}/${courtGroupId}`);
  }

  updateCourtGroup(courtGroup: CourtGroup): Observable<CourtGroup> {
    return this.http.put<CourtGroup>(`${this.courtGrApiUrl}/${courtGroup.id}`, courtGroup);
  }

  getCourtGroupWithRevenueByOwnerId(userId: string, month: string, year: string): Observable<PagedResponse<CourtGroup>> {

    return this.http.get<{value: PagedResponse<CourtGroup>}>(`${this.apiUrl}/${userId}/court-groups/revenue?Month=${month}&Year=${year}`)
      .pipe(map(response => {
        return response.value;
      }))
  }

}
