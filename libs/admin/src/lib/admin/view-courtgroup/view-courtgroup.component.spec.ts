import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewCourtgroupComponent } from './view-courtgroup.component';

describe('ViewCourtgroupComponent', () => {
  let component: ViewCourtgroupComponent;
  let fixture: ComponentFixture<ViewCourtgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCourtgroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCourtgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
