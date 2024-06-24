export interface CourtYard {
  id: string;
  courtGroupId: string;
  name: string;
  status: string | null;
  type: string;
  createdOnUtc: string;
  modifiedOnUtc: string | null;
}
