import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewOwnerComponent } from './overview-owner.component';

describe('OverviewOwnerComponent', () => {
  let component: OverviewOwnerComponent;
  let fixture: ComponentFixture<OverviewOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
