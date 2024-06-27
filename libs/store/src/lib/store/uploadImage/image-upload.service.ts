import { inject, Injectable } from '@angular/core';
import { Storage, StorageReference, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  storage = inject(Storage);

  uploadImage(file: File, filePath: string): Observable<string> {
    const storageRef: StorageReference = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable(observer => {
      uploadTask.on(
        'state_changed',
        null,
        error => observer.error(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            observer.next(url);
            console.log(url);
            observer.complete();
          });
        }
      );
    });
  }
}
