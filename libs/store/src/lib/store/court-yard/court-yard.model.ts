export interface CourtYard {
  id: string;
  courtGroupId: string;
  name: string;
  status: number | null;
  type: string;
  createdOnUtc: string;
  modifiedOnUtc: string | null;
}
