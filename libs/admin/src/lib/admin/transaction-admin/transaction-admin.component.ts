import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import {
  loadTransaction,
  selectRevenuesError,
  selectRevenuesLoading, selectTransaction,
  Transaction
} from '@org/store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-transaction-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-admin.component.html',
  styleUrl: './transaction-admin.component.scss',
})
export class TransactionAdminComponent implements OnInit{
  transactions$: Observable<Transaction[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(selectTransaction);
    this.loading$ = this.store.select(selectRevenuesLoading);
    this.error$ = this.store.select(selectRevenuesError);
  }

  ngOnInit(): void {
    const pageNumber = 1;
    const pageSize = 15;
    this.store.dispatch(loadTransaction({ pageNumber, pageSize }));
  }
}
