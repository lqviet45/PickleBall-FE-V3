import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewStaffComponent } from './overview-staff.component';

describe('OverviewStaffComponent', () => {
  let component: OverviewStaffComponent;
  let fixture: ComponentFixture<OverviewStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewStaffComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
