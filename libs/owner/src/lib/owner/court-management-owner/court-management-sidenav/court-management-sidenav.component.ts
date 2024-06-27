import {
  Component,
  EventEmitter, OnChanges,
  OnInit,
  Output, SimpleChanges
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { select, Store } from '@ngrx/store';
import { Observable} from 'rxjs';
import {
  AuthService,
  CourtGroup, createCourtGroup, ImageUploadService,
  loadCourtGroupByOwnerId, loadUser,
  selectAllCourtGroups, selectCourtGroupByOwnerId, selectCourtGroupCreated, selectCurrentUser, UserInterface

} from '@org/store';
import { MatDialog } from '@angular/material/dialog';
import { NewCourtGroupComponent } from './new-court-group/new-court-group.component';

@Component({
  selector: 'lib-court-management-sidenav',
  standalone: true,
  imports: [CommonModule, MatIcon, NgOptimizedImage, MatButton, MatProgressSpinner],
  templateUrl: './court-management-sidenav.component.html',
  styleUrl: './court-management-sidenav.component.scss'
})
export class CourtManagementSidenavComponent implements OnInit, OnChanges {


  @Output() courtSelected = new EventEmitter<string>();
  courtsGroup$!: Observable<CourtGroup[]>;
  userId = '';
  user$: Observable<UserInterface | null>;
  selectedCourtId: string | null = null;
  courtGroupCreated$: Observable<boolean>;
  constructor(
    private store: Store,
    public dialog: MatDialog,
    private imageUploadService: ImageUploadService,
    private authService: AuthService
  ) {
    this.user$ = store.pipe(select(selectCurrentUser));
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
    this.courtGroupCreated$ = this.store.select(selectCourtGroupCreated);
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId }));
    this.courtsGroup$ = this.store.select(selectCourtGroupByOwnerId(this.userId));
    //console.log("On change: ", this.courtsGroup$);
  }

  ngOnInit(): void {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({  firebaseId }));
    }
    this.user$.subscribe(
      user => {
        this.userId = user?.id || '';
        this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId }));
      }
    )

    // Tao selector moi
    this.courtsGroup$.subscribe(courtGroups => {
      if (courtGroups && courtGroups.length > 0) {
        this.selectedCourtId = courtGroups[0].id; // Set the first court as selected by default
      }
    });

    this.courtGroupCreated$.subscribe((created) => {
      if (created) {
        // Handle logic after a court group is created
        this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId }));
      }
    });

  }


  onCourtSelected(court: string) {
    this.selectedCourtId = court;
    this.courtSelected.emit(court);
    //console.log(court);
  }


  openDialog() {
    const dialogRef = this.dialog.open(NewCourtGroupComponent, {
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
      }
    });
  }

}
