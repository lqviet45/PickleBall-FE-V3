import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCourtGroupComponent } from './add-court-group.component';

describe('AddCourtGroupComponent', () => {
  let component: AddCourtGroupComponent;
  let fixture: ComponentFixture<AddCourtGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourtGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCourtGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
