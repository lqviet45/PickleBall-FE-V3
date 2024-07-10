export interface Slots {
  id: string;
  courtYardId: string;
  slotName: string
  status: string;
  createdOnUtc: string;
  modifiedOnUtc: string;
  isBooked: boolean;
  slotBookings: [];
}
