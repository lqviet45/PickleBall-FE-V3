import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtManagementOwnerComponent } from './court-management-owner.component';

describe('CourtManagementOwnerComponent', () => {
  let component: CourtManagementOwnerComponent;
  let fixture: ComponentFixture<CourtManagementOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtManagementOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtManagementOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
