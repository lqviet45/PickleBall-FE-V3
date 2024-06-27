import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { loadUser, UserInterface, UserState } from '@org/store';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit{
  user$: Observable<UserInterface | null>;
  error$: Observable<any>;

  constructor(private store: Store<{ user: UserState }>, private route: ActivatedRoute) {
    this.user$ = store.pipe(select(state => state.user.user));
    this.error$ = store.pipe(select(state => state.user.error));
  }

  ngOnInit(): void {
    const firebaseId = this.route.snapshot.paramMap.get('firebaseId');
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
    }
  }
}
