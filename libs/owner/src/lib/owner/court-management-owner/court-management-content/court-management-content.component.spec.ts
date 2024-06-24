import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtManagementContentComponent } from './court-management-content.component';

describe('CourtManagementContentComponent', () => {
  let component: CourtManagementContentComponent;
  let fixture: ComponentFixture<CourtManagementContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtManagementContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
