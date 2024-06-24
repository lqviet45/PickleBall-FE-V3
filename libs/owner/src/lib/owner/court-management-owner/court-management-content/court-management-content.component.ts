import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

export interface CourtData {
  id: string;
  name: string;
  price: number;
  status: string;
}

@Component({
  selector: 'lib-court-management-content',
  standalone: true,
  imports: [CommonModule, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatHeaderRow, MatRow, MatRowDef, MatIconButton, MatIcon, MatCellDef, MatHeaderRowDef],
  templateUrl: './court-management-content.component.html',
  styleUrl: './court-management-content.component.scss',
})
export class CourtManagementContentComponent {

  @Input() courtGroupId!: string;
  displayedColumns: string[] = ['stt', 'name', 'price', 'status', 'action'];
  dataSource: CourtData[] = [];

  onDeleteClick(id: string) {
    // this.store.dispatch(deleteCourtGroup({ id }));
  }

  onEditClick(id: string) {
    // this.store.dispatch(editCourtGroup({ id }));
  }
}
