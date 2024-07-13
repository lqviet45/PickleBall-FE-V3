import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtGroupRevenueComponent } from './court-group-revenue.component';

describe('CourtGroupRevenueComponent', () => {
  let component: CourtGroupRevenueComponent;
  let fixture: ComponentFixture<CourtGroupRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtGroupRevenueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtGroupRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
