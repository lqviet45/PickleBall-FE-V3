  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import {
    loadOwnerTransaction,
    selectOwnerTransaction,
    selectRevenuesError,
    selectRevenuesLoading,
    Transaction
  } from '@org/store';
  import { Observable } from 'rxjs';
  import { Store } from '@ngrx/store';

  @Component({
    selector: 'lib-transaction-view-owner',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-view-owner.component.html',
    styleUrl: './transaction-view-owner.component.scss',
  })
  export class TransactionViewOwnerComponent implements OnInit{
    transactions$: Observable<Transaction[]>;
    loading$: Observable<boolean>;
    error$: Observable<any>;

    constructor(private store: Store) {
      this.transactions$ = this.store.select(selectOwnerTransaction);
      this.loading$ = this.store.select(selectRevenuesLoading);
      this.error$ = this.store.select(selectRevenuesError);
    }

    ngOnInit(): void {
      const courtGroupId = '4ff652d7-4015-4c6f-885e-08dc96754fb9'; // example courtGroupId
      const pageNumber = 1;
      const pageSize = 12;
      this.store.dispatch(loadOwnerTransaction({ courtGroupId, pageNumber, pageSize }));
    }
  }
