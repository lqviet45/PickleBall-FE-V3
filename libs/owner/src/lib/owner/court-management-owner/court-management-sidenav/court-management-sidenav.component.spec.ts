import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtManagementSidenavComponent } from './court-management-sidenav.component';

describe('CourtManagementSidenavComponent', () => {
  let component: CourtManagementSidenavComponent;
  let fixture: ComponentFixture<CourtManagementSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtManagementSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtManagementSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
