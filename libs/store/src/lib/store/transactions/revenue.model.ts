export interface Week {
  week: string;
  totalRevenue: number;
  playerCount: number;
}

export interface RevenueResponse {
  value: {
    weeks: Week[];
  };
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}
