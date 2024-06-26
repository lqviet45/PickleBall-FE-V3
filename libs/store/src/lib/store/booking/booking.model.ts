export interface Booking {
  bookingId: string;
  courtYardId: string
  courtYardName?: string;
  courtGroupId: string;
  courtGroupName?:string;
  userId: string;
  numberOfPlayers?: number;
  timeRange?: string;
  userName?:string,
  date? : {dateId: string, dateWorking: string}[]
  bookingStatus: number,
  createdOnUtc: string;
}
