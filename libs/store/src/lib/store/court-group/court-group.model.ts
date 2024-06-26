export interface CourtGroup {
  id: string;
  userId?: string; // Make optional if not always present
  wardId?: string;
  wardName?: string;
  name: string;
  price?: number;
  minSlots?: number;
  maxSlots?: number;
  createdOnUtc?: string;
  modifiedOnUtc?: string | null;
  medias?: any[];
  mediaUrl?: string;
}


