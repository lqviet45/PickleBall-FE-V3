import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private auth: Auth) {}

  register(email: string, password: string, firstName: string, lastName: string, fullName: string, location: string, role: number) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map(userCredential => {
        // Optionally update the user profile (e.g., displayName)
        const user = userCredential.user;
        return updateProfile(user,{
          displayName: fullName
        }).then(() => {
          // You can also store additional user info to your backend
          return { ...userCredential, role, firstName, lastName, location };
        });
      })
    );
  }
}
