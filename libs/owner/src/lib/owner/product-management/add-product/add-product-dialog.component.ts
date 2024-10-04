import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ImageUploadService } from '@org/store';

@Component({
  selector: 'lib-add-product-dialog',
  standalone: true,
  imports: [CommonModule, MatFormField, ReactiveFormsModule, MatDialogTitle, MatDialogContent, MatInput, MatDialogActions, MatButton],
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.scss',
})
export class AddProductDialogComponent{

  addProductForm: FormGroup;
  imageUrl: string | undefined = '';
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<AddProductDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageUploadService: ImageUploadService

  ) {
    this.addProductForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],
      description: ['', Validators.maxLength(200)],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      courtGroupId: [this.data.courtGroupId || '', Validators.required]
    });
  }

  // Trigger input file dialog
  triggerFileInput(): void {
    const fileInput = document.getElementById('productImage') as HTMLInputElement;
    fileInput.click();
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const filePath = `products/${Date.now()}_${file.name}`; // Define a path for Firebase Storage

      // Upload the image using the ImageUploadService
      this.imageUploadService.uploadImage(file, filePath).subscribe(
        (url: string) => {
          this.imageUrl = url; // Set the image URL for preview
          this.addProductForm.get('imageUrl')?.setValue(url); // Set the form control value
          console.log('Image uploaded successfully, URL:', url);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  // Handle drag-and-drop events for file upload
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      const filePath = `products/${Date.now()}_${file.name}`;

      // Upload the image
      this.imageUploadService.uploadImage(file, filePath).subscribe(
        (url: string) => {
          this.imageUrl = url;
          this.addProductForm.get('imageUrl')?.setValue(url);
          //console.log('Image uploaded successfully:', url);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }


  // Form submission
  onSubmit(): void {
    if (this.addProductForm.valid) {
      this.dialogRef.close({
        formData: this.addProductForm.value,
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}
