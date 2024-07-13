import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService, ImageUploadService, loadUser, updateUser, UserInterface, UserState } from '@org/store';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from './edit-user/edit-user-dialog.component';
import { getAuth, updateProfile } from "firebase/auth";

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [CommonModule, MatCard, MatDivider, MatCardContent, MatIcon, MatIconButton, MatButton, NgOptimizedImage],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit{
  user$: Observable<UserInterface | null>;
  error$: Observable<any>;
  userAction$: Observable<boolean>;
  user: UserInterface | null = null;
  imageUrl: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;


  constructor(
    private store: Store<{ user: UserState }>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private imageUploadService: ImageUploadService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user$ = store.pipe(select(state => state.user.user));
    this.error$ = store.pipe(select(state => state.user.error));
    this.userAction$ = store.pipe(select(state => state.user.userAction));
    this.imageUrl = this.authService.currentUserSig()?.photoURL || null;
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

    this.imageUrl = this.authService.currentUserSig()?.photoURL || null;

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

  onUploadIconClick() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const auth = getAuth();
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (auth.currentUser && file) {
      const filePath = `users/${Date.now()}_${file.name}`;
      this.imageUploadService.uploadImage(file, filePath).subscribe(
        imageURL => {
          updateProfile(auth.currentUser!, {
            photoURL: imageURL
          }).then(() => {
            console.log('Profile photo URL updated successfully.');
            this.imageUrl = imageURL;
          })
        },
        error => {
          console.error('Failed to upload image:', error);
        }
      );
    }
  }

  onBackToHome() {

    if (this.user?.role === 'Owner') {
      this.router.navigate(['/owner']);
    } else if (this.user?.role === 'Manager') {
      this.router.navigate(['/staff']);
    } else {
      this.router.navigate(['/']);
    }
  }


}
