import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSidebarComponent } from './product-sidebar/product-sidebar.component';
import { Observable } from 'rxjs';
import {
  AuthService,
  CourtGroup, createProduct, loadCourtGroupByOwnerId, loadProducts, loadUser, Product,
  selectAllCourtGroups,
  selectCourtGroupLoading,
  selectCurrentUser, selectProducts, updateProduct,
  UserInterface
} from '@org/store';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProductDialogComponent } from './add-product/add-product-dialog.component';
import { UpdateProductFormComponent } from './update-product/update-product-form.component';

@Component({
  selector: 'lib-product-management',
  standalone: true,
  imports: [CommonModule, ProductSidebarComponent, FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss',
})
export class ProductManagementComponent implements OnInit {

  courtsGroup$: Observable<CourtGroup[]>;
  user$: Observable<UserInterface | null>;
  userId = '';
  isLoading$: Observable<boolean>
  products$: Observable<Product[]>;
  courtsGroup: any[] = [];

  pageNumber = 1;
  pageSize = 20;

  selectedCourtGroup: string | null = null;

  constructor(
    private store: Store,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.courtsGroup$ = this.store.select(selectAllCourtGroups);
    this.user$ = this.store.select(selectCurrentUser);
    this.isLoading$ = this.store.select(selectCourtGroupLoading);
    this.products$ = this.store.select(selectProducts);
  }

  ngOnInit(): void {
    const firebaseId = this.authService.currentUserSig()?.firebaseId;
    if (firebaseId) {
      this.store.dispatch(loadUser({  firebaseId }));
    }
    this.user$.subscribe(
      user => {
        this.userId = user?.id || '';
        this.loadCourtGroups();
        this.loadProducts();
      }
    )

    this.courtsGroup$.subscribe(courtGroups => {
      if (courtGroups && courtGroups.length > 0) {
        this.selectedCourtGroup = courtGroups[0].id;  // Automatically select the first court group
        this.courtsGroup = courtGroups;
        this.loadProducts(); // Load products for the first court group
      }
    });


  }

  loadCourtGroups(): void {
    this.store.dispatch(loadCourtGroupByOwnerId({ ownerId: this.userId, pageNumber: this.pageNumber, pageSize: this.pageSize }));
  }

  loadProducts(): void {
    if (this.selectedCourtGroup) {
      this.store.dispatch(loadProducts({ courtGroupId: this.selectedCourtGroup }));
    }
  }

  onCourtGroupChange(): void {
    this.loadProducts();  // Reload products when the selected court group changes
  }


  onUpdateProduct(product: Product) {

    const dialogRef = this.dialog.open(UpdateProductFormComponent, {
      width: '800px',
      data: {
        product: product
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editProduct: Product = {
          id: result.formData.id,
          description: result.formData.description,
          imageUrl: result.formData.imageUrl,
          price: result.formData.price,
          productName: result.formData.productName,
          quantity: result.formData.quantity,
          courtGroupId: product.courtGroupId
        }
        this.store.dispatch(updateProduct({ product: editProduct }));
      }
    })

  }

  onDeleteProduct(product: Product) {
    console.log('Delete product', product);
  }

  openAddProductModal() {
    const selectedCourtGroup = this.courtsGroup.find(group => group.id === this.selectedCourtGroup);

    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      width: '800px',
      data: {
        courtGroupId: this.selectedCourtGroup,
        courtGroupName: selectedCourtGroup ? selectedCourtGroup.name : ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newProduct: Product = {
          courtGroupId: result.formData.courtGroupId,
          description: result.formData.description,
          imageUrl: result.formData.imageUrl,
          price: result.formData.price,
          productName: result.formData.productName,
          quantity: result.formData.quantity
        }

        //console.log('New product:', newProduct);
        this.store.dispatch(createProduct({ product: newProduct }));
      }
    })

  }
}
