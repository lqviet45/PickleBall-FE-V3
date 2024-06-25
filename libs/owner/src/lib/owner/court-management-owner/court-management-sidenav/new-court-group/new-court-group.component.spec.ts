import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewCourtGroupComponent } from './new-court-group.component';

describe('NewCourtGroupComponent', () => {
  let component: NewCourtGroupComponent;
  let fixture: ComponentFixture<NewCourtGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCourtGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewCourtGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
