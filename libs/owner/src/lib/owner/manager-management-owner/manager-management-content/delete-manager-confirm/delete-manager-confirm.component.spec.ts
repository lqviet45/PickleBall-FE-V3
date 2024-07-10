import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteManagerConfirmComponent } from './delete-manager-confirm.component';

describe('DeleteManagerConfirmComponent', () => {
  let component: DeleteManagerConfirmComponent;
  let fixture: ComponentFixture<DeleteManagerConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteManagerConfirmComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteManagerConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
