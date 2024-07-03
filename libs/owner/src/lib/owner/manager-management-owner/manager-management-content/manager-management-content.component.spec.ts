import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagerManagementContentComponent } from './manager-management-content.component';

describe('ManagerManagementContentComponent', () => {
  let component: ManagerManagementContentComponent;
  let fixture: ComponentFixture<ManagerManagementContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerManagementContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagerManagementContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
