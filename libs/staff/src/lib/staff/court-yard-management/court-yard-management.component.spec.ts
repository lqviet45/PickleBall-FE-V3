import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtYardManagementComponent } from './court-yard-management.component';

describe('CourtYardManagementComponent', () => {
  let component: CourtYardManagementComponent;
  let fixture: ComponentFixture<CourtYardManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtYardManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtYardManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
