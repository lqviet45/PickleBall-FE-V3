import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerManagementOwnerComponent } from './manager-management-owner.component';

describe('ManagerManagementOwnerComponent', () => {
  let component: ManagerManagementOwnerComponent;
  let fixture: ComponentFixture<ManagerManagementOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerManagementOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerManagementOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
