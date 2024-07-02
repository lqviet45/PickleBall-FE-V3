import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerManagementHeaderComponent } from './manager-management-header.component';

describe('ManagerManagementHeaderComponent', () => {
  let component: ManagerManagementHeaderComponent;
  let fixture: ComponentFixture<ManagerManagementHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerManagementHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerManagementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
