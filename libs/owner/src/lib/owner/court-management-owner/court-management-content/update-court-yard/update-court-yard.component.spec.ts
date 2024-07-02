import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCourtYardComponent } from './update-court-yard.component';

describe('UpdateCourtYardComponent', () => {
  let component: UpdateCourtYardComponent;
  let fixture: ComponentFixture<UpdateCourtYardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCourtYardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCourtYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
