import { Injectable } from '@angular/core';
import { ProductsService } from './product.services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from './product.actions'
import { mergeMap, of, switchMap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  loadProductsByCourtGroupId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap(action =>
        this.productService.getProductsByCourtGroupId(action.courtGroupId).pipe(
          map(products => ProductActions.loadProductSuccess({ products })),
          catchError(error => of(ProductActions.loadProductFailure({ error })))
       )
      )
    )
  );

  // Create product and reload all products
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(action =>
        this.productService.createProduct(action.product).pipe(
          // After successfully creating, dispatch loadProducts to fetch all products
          switchMap(() => [
            ProductActions.loadProducts({ courtGroupId: action.product.courtGroupId }) // Reload all products after creating
          ]),
          catchError(error => of(ProductActions.loadProductFailure({ error })))
        )
      )
    )
  );

  // Update product and reload all products
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap(action =>
        this.productService.updateProduct(action.product).pipe(
          // After successfully updating, dispatch loadProducts to fetch all products
          switchMap(() => [
            ProductActions.loadProducts({ courtGroupId: action.product.courtGroupId }) // Reload all products after updating
          ]),
          catchError(error => of(ProductActions.loadProductFailure({ error })))
        )
      )
    )
  );

}
