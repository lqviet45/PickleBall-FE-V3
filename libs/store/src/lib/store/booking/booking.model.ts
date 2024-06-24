export interface Booking {
  bookingId: string;
  courtYardId: string
  courtYardName?: string;
  courtGroupId: string;
  courtGroupName?:string;
  userId: string;
  userName?:string,
  dateId: string;
  dateWorking?: string;
  numberOfPlayers: number,
  bookingStatus: number,
  createdOnUtc: string;
}
