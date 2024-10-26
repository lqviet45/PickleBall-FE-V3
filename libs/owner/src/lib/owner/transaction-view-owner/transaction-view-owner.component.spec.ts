import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionViewOwnerComponent } from './transaction-view-owner.component';

describe('TransactionViewOwnerComponent', () => {
  let component: TransactionViewOwnerComponent;
  let fixture: ComponentFixture<TransactionViewOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionViewOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionViewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
