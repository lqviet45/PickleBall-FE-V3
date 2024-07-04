// court-yard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourtYard } from './court-yard.model';
import { map } from 'rxjs/operators';
import { PagedResponse } from '../PagedResponse.model';


@Injectable({
  providedIn: 'root',
})
export class CourtYardService {

  private courtGroupApiUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups';
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/courtyards';
  private apiUrl2 = 'https://pickleballapp.azurewebsites.net/api/court-yards';

  constructor(private http: HttpClient) {
  }

  getAllCourtYardsByCourtGroupId(courtGroupId: string, pageNumber: number, pageSize: number): Observable<PagedResponse<CourtYard>> {
    let params = new HttpParams();
    if (pageNumber) {
      params = params.set('PageNumber', pageNumber.toString());
    }
    if (pageSize) {
      params = params.set('PageSize', pageSize.toString());
    }
    const url = `${this.courtGroupApiUrl}/${courtGroupId}/court-yards`;
    console.log(url);
    return this.http.get<{ value: PagedResponse<CourtYard> }>(url, { params }).pipe(
      map(response => response.value)
    );
  }

  createCourtYard(courtGroupId: string, courtYardName: string): Observable<CourtYard> {
    const url = `${this.courtGroupApiUrl}/${courtGroupId}/court-yards`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = `"${courtYardName}"`;  // Enclose the string in quotes
    return this.http.post<CourtYard>(url, body, {headers});
  }

  updateCourtYard(courtYard: CourtYard): Observable<CourtYard> {
    const url = `${this.apiUrl}/${courtYard.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<CourtYard>(url, courtYard, {headers});
  }

  deleteCourtYard(courtYardId: string): Observable<any> {
    const url = `${this.apiUrl2}/${courtYardId}`;
    return this.http.delete(url);
  }

}
