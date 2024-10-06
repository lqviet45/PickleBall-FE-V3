import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';


export const loadProducts = createAction(
  '[Product] Load Product',
  props<{ courtGroupId: string }>()
);

export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product] Load Product Failure',
  props<{ error: any }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: Product }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ product: Product }>()
);

