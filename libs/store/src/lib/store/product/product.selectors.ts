import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducers';


export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
)

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
)

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
)

export const selectProductById = (productId: string) => createSelector(
  selectProducts,
  (products) => products.find(product => product.id === productId)
)

// export const selectProductByCourtGroupId = (courtGroupId: string) => createSelector(
//   selectProducts,
//   (products) => products.filter(product => product.courtGroupId === courtGroupId)
// )

