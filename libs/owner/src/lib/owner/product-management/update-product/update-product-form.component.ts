import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageUploadService } from '@org/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-update-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product-form.component.html',
  styleUrl: './update-product-form.component.scss',
})
export class UpdateProductFormComponent implements OnInit{

  updateProductForm: FormGroup;
  imageUrl: string | undefined = '';
  selectedFile: File | null = null;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductFormComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageUploadService: ImageUploadService
  ) {
    this.updateProductForm = this.fb.group({
      productName: [this.data.product.productName || '', [Validators.required, Validators.minLength(3)]],
      imageUrl: [this.data.product.imageUrl || '', [Validators.required]],
      description: [this.data.product.description || '', Validators.maxLength(200)],
      quantity: [this.data.product.quantity || 0, [Validators.required, Validators.min(1)]],
      price: [this.data.product.price || 0, [Validators.required, Validators.min(1)]],
      id: [this.data.product.id, Validators.required]
    });
  }

  ngOnInit() {
    this.imageUrl = this.data.product.imageUrl;
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('productImage') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const filePath = `products/${Date.now()}_${file.name}`;

      this.imageUploadService.uploadImage(file, filePath).subscribe(
        (url: string) => {
          this.imageUrl = url;
          this.updateProductForm.get('imageUrl')?.setValue(url);
          console.log('Image uploaded successfully, URL:', url);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      const filePath = `products/${Date.now()}_${file.name}`;

      this.imageUploadService.uploadImage(file, filePath).subscribe(
        (url: string) => {
          this.imageUrl = url;
          this.updateProductForm.get('imageUrl')?.setValue(url);
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.updateProductForm.valid) {
      const updatedProduct = this.updateProductForm.value;
      this.dialogRef.close({ formData: updatedProduct });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
