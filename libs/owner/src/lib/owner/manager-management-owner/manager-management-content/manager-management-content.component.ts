import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {
  AuthService, createManager, deleteUser, loadManagerByOwner,
  loadUser,
  selectAllManagersByOwner,
  selectCurrentUser,
  selectUserAction, updateUser,
  UserInterface
} from '@org/store';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { DeleteManagerConfirmComponent } from './delete-manager-confirm/delete-manager-confirm.component';
import { EditManagerComponent } from './edit-manager/edit-manager.component';
import { AddManagerComponent } from './add-manager/add-manager.component';


@Component({
  selector: 'lib-manager-management-content',
  standalone: true,
  imports: [CommonModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatIconButton, MatRow, MatRowDef, MatTable, MatHeaderCellDef],
  templateUrl: './manager-management-content.component.html',
  styleUrl: './manager-management-content.component.scss',
})
export class ManagerManagementContentComponent implements OnInit{

  displayedColumns: string[] = ['stt', 'fullName', 'email', 'phoneNumber', 'location', 'action'];
  dataSource: UserInterface[] = [];
  managerList$: Observable<UserInterface[]>;
  managerActions$: Observable<boolean>;
  owner$: Observable<UserInterface | null>;
  ownerId = '';

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.owner$ = this.store.pipe(select(selectCurrentUser));
    this.managerList$ = this.store.select(selectAllManagersByOwner);
    this.managerActions$ = this.store.select(selectUserAction);
  }

  ngOnInit(): void {
    // const firebaseId = this.authService.currentUserSig()?.firebaseId;
    // if (firebaseId) {
    //   this.store.dispatch(loadUser({  firebaseId }));
    // }
    this.owner$.subscribe(
      owner => {
        this.ownerId = owner?.id || '';
        this.store.dispatch(loadManagerByOwner({ownerId: this.ownerId}));
      }
    )
    this.managerList$.subscribe(managers => {
      this.dataSource = managers;
    });

    this.managerActions$.subscribe((action) => {
      if (action) {
        this.store.dispatch(loadManagerByOwner({ownerId: this.ownerId}));
      }
    })

  }


  onCreateManager() {
    const dialogRef = this.dialog.open(AddManagerComponent, {
      width: '600px',
      data: { managerId: this.ownerId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(createManager({ ownerId: this.ownerId, user: result }));
      }
    });
  }

  onEditClick(id: string) {
    const dialogRef = this.dialog.open(EditManagerComponent, {
      width: '600px',
      data: { managerId: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.store.dispatch(updateUser({ user: result }));
      }
    })

  }

  onDeleteClick(id: string) {
    //console.log(id);
    const dialogRef = this.dialog.open(DeleteManagerConfirmComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteUser({ id }));
      }
    })

  }
}
