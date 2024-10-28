export interface Week {
  week: string
  totalRevenue: number
  playerCount: number
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

export interface CurrentRevenue {
  currentDate: string;
  totalDayRevenue: number;
  totalMonthRevenue: number;
  playerCountOfMonth: number;
}

export interface AdminRevenueResponse {
  value: {
    weeks: any[],
    totalRevenue: number;
    totalBookings: number;
    totalProducts: number
  }
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}
export interface AdminRevenueTodayResponse {
  value: {
    todayRevenue: number,
    todayBookings: number,
  }
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}

export interface OwnerRevenueTodayResponse {
  value: {
    monthRevenue: number
    todayRevenue: number
    todayBookings: number
  }
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}

export interface OwnerRevenueResponse {
  value: {
    weeks: Week2[],
    totalRevenue: number,
    totalBookings: number,
    totalProducts: number
  }
  valueType: string;
  status: string;
  isSuccess: boolean;
  successMessage: string;
  correlationId: string;
  location: string;
  errors: any[];
  validationErrors: any[];
}

export interface Week2 {
  week: string
  totalRevenue: number
  totalBookings: number
}
export interface Transaction{
  amount: number;
  userName: string;
  courtGroupName: string;
  createdOnUtc: string
}
