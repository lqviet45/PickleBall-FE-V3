import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  private productUrl = 'https://pickleballapp.azurewebsites.net/api/products';
  private courtGroupUrl = 'https://pickleballapp.azurewebsites.net/api/court-groups';


  constructor(private http: HttpClient) {}

  getProductsByCourtGroupId(courtGroupId: string) {
    return this.http.get< {value: Product[]} >(`${this.courtGroupUrl}/${courtGroupId}/products`)
      .pipe(map(response => {
        //console.log(response.value);
        return response.value;
      }));
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.productUrl}`, product
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.productUrl}/${product.id}`, product
    );
  }

}

