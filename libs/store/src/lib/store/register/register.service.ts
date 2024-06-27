import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private auth: Auth) {}

  register(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }
}
