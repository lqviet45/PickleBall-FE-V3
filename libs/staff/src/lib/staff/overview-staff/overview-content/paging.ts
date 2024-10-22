import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'lib-pagination',
  template: `
    <div class="pagination">
      <div (click)="onPreviousPage()">Previous</div>
      <span>{{ currentPage }} of {{ totalPages }}</span>
      <div (click)="onNextPage()">Next</div>
    </div>
  `,
  standalone: true,
  styles: [`
    .pagination {
      display: flex;
      justify-content: right;
      align-items: center;
    }

    .pagination div {
      margin: 0 10px;
      cursor: pointer;
      color: #0056b3;
    }

    .pagination span {
      margin: 0 10px;
      color: black;
    }
  `]
})
export class PagingComponent implements OnInit {
  @Input() totalBookings?: number
  @Input() pageSize: number;
  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;
  totalPages?: number;

  constructor() {
    this.pageSize = 4;
    this.totalPages = 0;
  }

  ngOnInit(): void {
    if (this.totalBookings !== undefined) {
      this.totalPages = Math.ceil(this.totalBookings / this.pageSize);
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  onNextPage(): void {
    if(this.totalPages !== undefined) {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.pageChange.emit(this.currentPage);
      }
    }
  }
}
