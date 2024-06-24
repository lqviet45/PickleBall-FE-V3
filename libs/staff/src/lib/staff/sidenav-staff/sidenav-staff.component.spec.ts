import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavStaffComponent } from './sidenav-staff.component';

describe('SidenavStaffComponent', () => {
  let component: SidenavStaffComponent;
  let fixture: ComponentFixture<SidenavStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavStaffComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
