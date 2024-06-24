// court-yard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourtYard } from './court-yard.model';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class CourtYardService {

  private getAllCourtYardsByCourtGroupIdUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups';

  constructor(private http: HttpClient) {
  }

  getAllCourtYardsByCourtGroupId(courtGroupId: string): Observable<CourtYard[]> {
    const url = `${this.getAllCourtYardsByCourtGroupIdUrl}/${courtGroupId}/court-yards`;
    console.log(url);
    return this.http.get<{ value: CourtYard[] }>(url).pipe(
      map(response => response.value)
    );
  }
}
