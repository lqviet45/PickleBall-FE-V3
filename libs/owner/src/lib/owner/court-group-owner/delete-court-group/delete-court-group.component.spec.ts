import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCourtGroupComponent } from './delete-court-group.component';

describe('DeleteCourtGroupComponent', () => {
  let component: DeleteCourtGroupComponent;
  let fixture: ComponentFixture<DeleteCourtGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCourtGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCourtGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
