export interface CourtYard {
  id: string;
  courtGroupId: string;
  name: string;
  courtYardStatus: string | null;
  status: number | null;
  type: string;
  createdOnUtc: string;
  modifiedOnUtc: string | null;
}
