import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { CityResponse, WardResponse } from '../location.interface';


@Component({
  selector: 'lib-add-court-group',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-court-group.component.html',
  styleUrl: './add-court-group.component.scss',
})

export class AddCourtGroupComponent implements OnInit{

  courtGroupForm: FormGroup;
  selectedFile: File | null = null;
  cities: any[] = [];
  districts: any[] = [];
  wards: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCourtGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    //console.log(data)
    this.courtGroupForm = this.fb.group({
      userId: [data.userId, Validators.required],
      name: ['', Validators.required],
      wardName: ['', Validators.required],
      price: [0, Validators.required],
      minSlots: [1, Validators.required],
      maxSlots: [24, Validators.required],
      mediaUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadCities();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.courtGroupForm.value);
    if (this.courtGroupForm.valid) {
      this.dialogRef.close({
        formData: this.courtGroupForm.value,
        file: this.selectedFile
      });
    }
  }

  loadCities(): void {
    this.http.get<CityResponse>('https://pickleballapp.azurewebsites.net/api/cities')
      .subscribe({
        next: (response: CityResponse) => {
          this.cities = response.value;
        },
        error: (error) => {
          console.error('Error loading cities:', error);
        }
      });
  }

  onCityChange(event: any): void {
    const cityName = event.target.value;
    const selectedCity = this.cities.find(city => city.name === cityName);
    if (selectedCity) {
      this.districts = selectedCity.districts;
    } else {
      this.districts = [];
    }
    this.wards = [];
  }

  onDistrictChange(event: any): void {
    const districtId = event.target.value;
    this.http.get<WardResponse>(`https://pickleballapp.azurewebsites.net/api/districts/${districtId}/wards`)
      .subscribe({
        next: (response: WardResponse) => {
          this.wards = response.value;
        },
        error: (error) => {
          console.error('Error loading wards:', error);
        }
      });
  }

}
