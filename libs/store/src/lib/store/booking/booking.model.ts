export interface Booking {
  id: string;
  courtYardId: string;
  courtYardName?: string;
  courtGroup: {
    id: string;
    name: string;
    price: string;
  };
  userId?: string;
  numberOfPlayers?: number;
  timeRange?: string;
  userName?: string;
  date: {
    dateId: string;
    dateWorking: string;
  };
  bookingStatus: string;
  createdOnUtc: string;
}
