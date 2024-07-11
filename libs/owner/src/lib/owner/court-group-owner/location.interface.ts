export interface CityResponse {
  value: City[];
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}

export interface City {
  name: string;
  createdOnUtc: string;
  modifiedOnUtc: any;
  districts: District[];
}

export interface District {
  id: number;
  name: string;
  cityId: number;
  createdOnUtc: string;
  modifiedOnUtc?: string;
}

export interface WardResponse {
  value: Ward[];
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}

export interface Ward {
  id: string;
  name: string;
  districtId: number;
  createdOnUtc: string;
  modifiedOnUtc: string;
}
