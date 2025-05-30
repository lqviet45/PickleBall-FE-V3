import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditManagerComponent } from './edit-manager.component';

describe('EditManagerComponent', () => {
  let component: EditManagerComponent;
  let fixture: ComponentFixture<EditManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
