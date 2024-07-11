import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtGroupOwnerComponent } from './court-group-owner.component';

describe('CourtGroupOwnerComponent', () => {
  let component: CourtGroupOwnerComponent;
  let fixture: ComponentFixture<CourtGroupOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtGroupOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtGroupOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
