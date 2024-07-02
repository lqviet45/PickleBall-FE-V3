import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword, signOut,
  user
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../user/user.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);
  private registerApi = 'https://pickleballapp.azurewebsites.net/api/users';
  private userApi = `https://pickleballapp.azurewebsites.net/api/users`;
  constructor(
    private http: HttpClient,
    private router: Router // Inject Router for navigation
  ) {}

  register(email: string, password: string, firstName: string, lastName: string, fullName: string, location: string, role: number): Observable<any> {
    const body = { email, password, firstName, lastName, fullName, location };
    return this.http.post<any>(this.registerApi, body);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password).then(() => {
      // Retrieve the current user and set it in the signal
      const currentUser = this.firebaseAuth.currentUser;
      if (currentUser) {
        console.log('Logged in as:', currentUser);
        this.currentUserSig.set({
          firebaseId: currentUser.uid,
          email: currentUser.email!,
          username: currentUser.displayName || '',
          photoURL: currentUser.photoURL || ''
        });
        console.log('User:', this.currentUserSig());
        // Call API to get user's role
        this.getUserProfile(currentUser.uid).subscribe(
          (userProfile: UserInterface) => {
            this.currentUserSig.set({
              firebaseId: currentUser.uid,
              email: currentUser.email!,
              username: currentUser.displayName || '',
              role: userProfile.role, // Assuming userProfile includes a 'role' property
              photoURL: currentUser.photoURL || ''
            });
            // Navigate based on user's role
            if (userProfile.role === "Owner") {
              this.router.navigate(['/owner']);
            } else if (userProfile.role === "Manager") {
              this.router.navigate(['/staff']);
            } else {
              // Handle other roles if needed
              console.log('Unknown role:', userProfile.role);
            }
          },
          (error) => {
            console.error('Failed to fetch user profile:', error);
            // Handle error, e.g., show a message or retry
          }
        );
      }
    });
    return from(promise);
  }
  getUserProfile(firebaseId: string): Observable<UserInterface> {
    const url = `${this.userApi}/firebase-id`;
    const payload = { firebaseId };
    return this.http.post<any>(url, payload).pipe(
      map(response => response.value as UserInterface)
    );
  }
  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth).then(() => {
      this.currentUserSig.set(null);
    });
    return from(promise);
  }
}
