import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCourtGroupComponent } from './update-court-group.component';

describe('UpdateCourtGroupComponent', () => {
  let component: UpdateCourtGroupComponent;
  let fixture: ComponentFixture<UpdateCourtGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourtGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCourtGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
