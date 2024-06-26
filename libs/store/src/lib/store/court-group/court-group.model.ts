export interface CourtGroup {
  id: string;
  userId?: string; // Make optional if not always present
  wardId?: string;
  walletId?: string;
  name: string;
  price?: number;
  minSlots?: number;
  maxSlots?: number;
  location?: string;
  createdOnUtc?: string;
  modifiedOnUtc?: string | null;
  medias?: { id: string, mediaUrl: string }[]; // Adjusted to match your data structure
}

