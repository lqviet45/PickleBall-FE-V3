import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from './user.interface';
import { map } from 'rxjs/operators';
import { PagedResponse } from '../PagedResponse.model';
import { Booking } from '../booking/booking.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://pickleballapp.azurewebsites.net/api/users';

  private countUrl = 'https://pickleballapp.azurewebsites.net/api/total-user';
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

  getManagersByOwner(ownerId: string): Observable<UserInterface[]> {
    const url = `${this.baseUrl}/${ownerId}/managers`
    //console.log(url);
    return this.http.get<{value: UserInterface[]}>(url)
      .pipe(map(response => response.value));
  }

  deleteUser(userId: string): Observable<void> {
    const url = `${this.baseUrl}/${userId}`; // Adjust endpoint as needed
    return this.http.delete<void>(url);
  }

  getUserById(id: string): Observable<UserInterface> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<{value: UserInterface}>(url)
      .pipe(map(response => response.value));
  }

  createManager(ownerId: string, user: UserInterface): Observable<UserInterface> {
    const url = `${this.baseUrl}/${ownerId}/managers`;
    return this.http.post<{ value: UserInterface }>(url, user).pipe(
      map(response => response.value)
    );
  }
  getAllUsers(role: number): Observable<UserInterface[]> {
    const url = `${this.baseUrl}/role?Role=${role}`;
    return this.http.get<{ value: UserInterface[] }>(url)
      .pipe(map(response => response.value));
  }
  countAllUsers(): Observable<any> {
    const url = `${this.countUrl}`;
    return this.http.get(url)
      .pipe(map(response => response));
  }
}
