import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  AuthService,
  CourtGroup, createCourtGroup, deleteCourtGroup,
  ImageUploadService, loadCourtGroupByOwnerId, loadUser, PagedResponse,
  selectAllCourtGroups, selectCourtGroupCreated, selectCourtGroupPagedResponse,
  selectCurrentUser, updateCourtGroup,
  UserInterface
} from '@org/store';
import { select, Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddCourtGroupComponent } from './add-court-group/add-court-group.component';
import { DeleteCourtGroupComponent } from './delete-court-group/delete-court-group.component';
import { UpdateCourtGroupComponent } from './update-court-group/update-court-group.component';


@Component({
  selector: 'lib-court-group-owner',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './court-group-owner.component.html',
  styleUrl: './court-group-owner.component.scss',
})
export class CourtGroupOwnerComponent implements OnInit{

  courtsGroup$!: Observable<CourtGroup[]>;
  userId = '';
  user$: Observable<UserInterface | null>;
  selectedCourtId: string | null = null;
  courtGroupCreated$: Observable<boolean>;
  pagedResponse$: Observable<PagedResponse<CourtGroup> | null>;
  pageNumber = 1;
  pageSize = 4;
  totalItems = 0;
  totalPages = 0;
  courtGroups: CourtGroup[] = [];

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private imageUploadService: ImageUploadService,
    private authService: AuthService
  ) {
    this.user$ = store.pipe(select(selectCurrentUser));
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
    this.courtGroupCreated$ = this.store.select(selectCourtGroupCreated);
    this.pagedResponse$ = this.store.select(selectCourtGroupPagedResponse);
  }

  ngOnInit(): void {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({ firebaseId }));
    }
    this.user$.subscribe(
      user => {
        this.userId = user?.id || '';
        this.loadCourtGroups();
      }
    );

    this.courtsGroup$.subscribe(courtGroups => {
      this.courtGroups = courtGroups;
      if (courtGroups && courtGroups.length > 0) {
        this.selectedCourtId = courtGroups[0].id; // Set the first court as selected by default
      }
    });

    this.courtGroupCreated$.subscribe((created) => {
      if (created) {
        this.loadCourtGroups();
      }
    });

    this.pagedResponse$.subscribe(pagedResponse => {
      if (pagedResponse) {
        this.totalItems = pagedResponse.totalCount;
        this.totalPages = pagedResponse.totalPages;
      }
    });


  }

  loadCourtGroups(): void {
    this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId, pageNumber: this.pageNumber, pageSize: this.pageSize }));
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNumber = page;
      this.loadCourtGroups();
    }
  }

  onEditClick(id: string) {
    const selectedCourtGroup = this.courtGroups.find(cg => cg.id === id);
    const dialogRef = this.dialog.open(UpdateCourtGroupComponent, {
      width: '800px',
      data: { courtGroup: selectedCourtGroup }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(updateCourtGroup( {courtGroup: result} ))
      }
    });

  }

  onDeleteClick(id: string) {
    const dialogRef = this.dialog.open(DeleteCourtGroupComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(deleteCourtGroup({ id: id }));
      }
    })

  }

  openDialog() {
    const dialogRef = this.dialog.open(AddCourtGroupComponent, {
      width: '600px',
      data: { userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { formData, file } = result;
        //console.log(formData)
        if (file) {
          const filePath = `courtGroups/${Date.now()}_${file.name}`;
          this.imageUploadService.uploadImage(file, filePath)
            .subscribe(url => {
              this.store.dispatch(createCourtGroup({
                courtGroup: {
                  ...formData,
                  mediaUrl: url
                }
              }));
            });
        } else {
          this.store.dispatch(createCourtGroup({ courtGroup: {
              ...formData
            } }));
        }

        //this.showNotification();


      }
    });

  }
}
