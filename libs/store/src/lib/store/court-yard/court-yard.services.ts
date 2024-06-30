// court-yard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourtYard } from './court-yard.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CourtYardService {

  private courtGroupApiUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups';
  private apiUrl = 'https://pickleballapp.azurewebsites.net/api/courtyards';
  private apiUrl2 = 'https://pickleballapp.azurewebsites.net/api/court-yards';

  constructor(private http: HttpClient) {
  }

  getAllCourtYardsByCourtGroupId(courtGroupId: string): Observable<CourtYard[]> {
    const url = `${this.courtGroupApiUrl}/${courtGroupId}/court-yards`;
    console.log(url);
    return this.http.get<{ value: CourtYard[] }>(url).pipe(
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
