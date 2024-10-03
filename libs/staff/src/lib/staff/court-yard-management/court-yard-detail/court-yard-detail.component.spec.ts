import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourtYardDetailComponent } from './court-yard-detail.component';

describe('CourtYardDetailComponent', () => {
  let component: CourtYardDetailComponent;
  let fixture: ComponentFixture<CourtYardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtYardDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourtYardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
