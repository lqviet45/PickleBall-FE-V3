import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
//import { CityResponse, District, WardResponse } from '../location.interface';
import { ImageUploadService } from '@org/store';

@Component({
  selector: 'lib-update-court-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-court-group.component.html',
  styleUrl: './update-court-group.component.scss',
})
export class UpdateCourtGroupComponent {

  courtGroupForm: FormGroup;
  selectedFile: File | null = null;
  cities: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  uploadedImageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateCourtGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    //private http: HttpClient,
    private imageUploadService: ImageUploadService
  ) {
    this.courtGroupForm = this.fb.group({
      id: [data.courtGroup.id, Validators.required],
      name: [data.courtGroup.name, Validators.required],
      price: [data.courtGroup.price, Validators.required],
      minSlots: [data.courtGroup.minSlots, Validators.required],
      maxSlots: [data.courtGroup.maxSlots, Validators.required],
      // wardName: [data.courtGroup.wardName, Validators.required],
      // mediaUrl: [this.getFirstMediaUrl(data.courtGroup.medias)]
    });
  }


  private getFirstMediaUrl(medias: any[]): string | null {
    return medias.length > 0 ? medias[0].mediaUrl : null;
  }

  // loadCities(): void {
  //   this.http.get<CityResponse>('https://pickleballapp.azurewebsites.net/api/cities')
  //     .subscribe({
  //       next: (response: CityResponse) => {
  //         this.cities = response.value;
  //         this.populateDistrictsAndWards();
  //       },
  //       error: (error) => {
  //         console.error('Error loading cities:', error);
  //       }
  //     });
  // }
  //
  // populateDistrictsAndWards(): void {
  //   const selectedCity = this.cities.find(city => city.districts.some((d: District) => d.id === this.data.courtGroup.districtId));
  //   if (selectedCity) {
  //     this.districts = selectedCity.districts;
  //     this.loadWards(this.data.courtGroup.districtId);
  //   }
  // }
  //
  // loadWards(districtId: number): void {
  //   this.http.get<WardResponse>(`https://pickleballapp.azurewebsites.net/api/districts/${districtId}/wards`)
  //     .subscribe({
  //       next: (response: WardResponse) => {
  //         this.wards = response.value;
  //       },
  //       error: (error) => {
  //         console.error('Error loading wards:', error);
  //       }
  //     });
  // }
  //
  // onCityChange(event: any): void {
  //   const cityName = event.target.value;
  //   const selectedCity = this.cities.find(city => city.name === cityName);
  //   if (selectedCity) {
  //     this.districts = selectedCity.districts;
  //   } else {
  //     this.districts = [];
  //   }
  //   this.wards = [];
  // }
  //
  // onDistrictChange(event: any): void {
  //   const districtId = event.target.value;
  //   this.loadWards(districtId);
  // }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadFile();
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const filePath = `courtGroups/${Date.now()}_${this.selectedFile.name}`;
      this.imageUploadService.uploadImage(this.selectedFile, filePath)
        .subscribe(url => {
          this.uploadedImageUrl = url;
          this.courtGroupForm.patchValue({ mediaUrl: url });
        });
    }
  }

  onSubmit(): void {
    if (this.courtGroupForm.valid) {
      this.dialogRef.close(this.courtGroupForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
