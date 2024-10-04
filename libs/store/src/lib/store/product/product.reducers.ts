import { Product } from './product.model';
import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string;
}

export const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: ''
};

export const productReducer = createReducer(
  initialProductState,

  on(ProductActions.loadProducts, state => ({ ...state, loading: true })),

  on(ProductActions.loadProductSuccess, (state, { products }) =>({
    ...state,
    products: products,
    loading: false
  })),

  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(ProductActions.createProduct, (state, { product }) => ({
    ...state,
    products: [...state.products, product]
  })),

  on(ProductActions.updateProduct, (state, { product }) => ({
    ...state,
    products: state.products.map(t => t.id === product.id ? product : t) })),

  //on(TodoActions.deleteTodo, (state, { id }) => ({ ...state, todos: state.todos.filter(t => t.id !== id) })),
);
