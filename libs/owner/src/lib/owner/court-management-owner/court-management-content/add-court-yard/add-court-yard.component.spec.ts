import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourtYardComponent } from './add-court-yard.component';

describe('AddCourtYardComponent', () => {
  let component: AddCourtYardComponent;
  let fixture: ComponentFixture<AddCourtYardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourtYardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCourtYardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
