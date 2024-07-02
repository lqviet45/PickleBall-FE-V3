import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://pickleballapp.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {}

  getUserProfile(firebaseId: string): Observable<UserInterface> {
    const url = `${this.baseUrl}/firebase-id`;
    const payload = { firebaseId };
    return this.http.post<any>(url, payload).pipe(
      map(response => response.value as UserInterface)
    );
  }

  updateUserProfile(user: UserInterface): Observable<UserInterface> {
    const url = `${this.baseUrl}/update-user`;
    return this.http.put<UserInterface>(url, user);
  }

}
