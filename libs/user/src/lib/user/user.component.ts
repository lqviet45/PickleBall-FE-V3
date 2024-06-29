import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { loadUser, updateUser, UserInterface, UserState } from '@org/store';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-user/edit-user-dialog.component';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [CommonModule, MatCard, MatDivider, MatCardContent, MatIcon, MatIconButton, MatButton],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit{
  user$: Observable<UserInterface | null>;
  error$: Observable<any>;
  userAction$: Observable<boolean>;
  user: UserInterface | null = null;

  constructor(
    private store: Store<{ user: UserState }>,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.user$ = store.pipe(select(state => state.user.user));
    this.error$ = store.pipe(select(state => state.user.error));
    this.userAction$ = store.pipe(select(state => state.user.userAction));
  }

  ngOnInit(): void {
    const firebaseId = this.route.snapshot.paramMap.get('firebaseId');
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
      this.user$.subscribe(
        user => this.user = user
      )
    }

    this.userAction$.subscribe((updated) => {
      if (updated) {
        if (firebaseId) {
          this.store.dispatch(loadUser({ firebaseId }));
          this.user$.subscribe(
            user => this.user = user
          )
        }
      }
    });

  }

  onEdit() {
    // Implement edit user
  }

  onOpenEditDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '800px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Dispatch update action with the updated user data
        console.log(result);
        this.store.dispatch(updateUser({ user: result }));
      }
    });

  }
}
