import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  constructor(private http: HttpClient) {}

  // getCourtGroups(): Observable<CourtGroup[]> {
  //   return this.http.get<{ value: CourtGroup[] }>(`${this.apiUrl}/18e3a373-c160-4510-733e-08dc94fc4248/court-groups`)
  //     .pipe(map(response => response.value));
  // }

  getCourtGroups(pageNumber: number, pageSize: number): Observable<PagedResponse<CourtGroup>> {
    let params = new HttpParams();
    params = params.set('PageNumber', pageNumber.toString());
    params = params.set('PageSize', pageSize.toString());

    return this.http.get<PagedResponse<CourtGroup>>(`${this.apiUrl}/18e3a373-c160-4510-733e-08dc94fc4248/court-groups`, { params });
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
        return response.value;
      }));
      //.pipe(map(response => response.value));
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

  createCourtGroup(courtGroup: CourtGroup): Observable<CourtGroup> {
    console.log('user id', courtGroup);
    return this.http.post<CourtGroup>(`${this.courtGrApiUrl}`, courtGroup);
  }

  deleteCourtGroup(courtGroupId: string): Observable<any> {
    return this.http.delete(`${this.courtGrApiUrl}/${courtGroupId}`);
  }

  updateCourtGroup(courtGroup: CourtGroup): Observable<CourtGroup> {
    return this.http.put<CourtGroup>(`${this.courtGrApiUrl}/${courtGroup.id}`, courtGroup);
  }

}
