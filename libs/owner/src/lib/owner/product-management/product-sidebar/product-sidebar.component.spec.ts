import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSidebarComponent } from './product-sidebar.component';

describe('ProductSidebarComponent', () => {
  let component: ProductSidebarComponent;
  let fixture: ComponentFixture<ProductSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
