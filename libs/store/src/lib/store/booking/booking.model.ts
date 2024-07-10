export interface Booking {
  id: string;
  numberOfPlayers: number;
  timeRange: string;
  bookingStatus: string;
  createdOnUtc: string;
  courtYard?: string;
  date?: { dateWorking: string, dateStatus: string }; // Adjusted to match your data structure
  user?: { email: string, fullName: string};
}
