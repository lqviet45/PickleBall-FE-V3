import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { loadAllUsers, selectFilteredUsers, UserInterface } from '@org/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UpdateUserComponent } from './update-user/update-user.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from './delete-user/delete-user.component';

@Component({
  selector: 'lib-manage-account',
  standalone: true,
  imports: [CommonModule,
    MatIcon, MatButton
  ],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss',
})
export class ManageAccountComponent implements OnInit{
  filteredUsers$: Observable<UserInterface[]>;
  selectedRole: number | null = null;

  constructor(private store: Store, public dialog: MatDialog) {
    this.filteredUsers$ = this.store.select(selectFilteredUsers);
  }

  ngOnInit(): void {
    this.filterUsers(2);
  }

  loadUsers(role: number) {
    this.store.dispatch(loadAllUsers({ role }));
  }

  filterUsers(role: number) {
    this.selectedRole = role;
    this.loadUsers(role);
  }

  openUpdateDialog(user: UserInterface): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: user,
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.filterUsers(this.selectedRole || 2); // Reload users on success
      }
    });
  }

  openDeleteDialog(user: UserInterface): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: user,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.filterUsers(this.selectedRole || 2); // Reload users on successful deletion
      }
    });
  }
}
