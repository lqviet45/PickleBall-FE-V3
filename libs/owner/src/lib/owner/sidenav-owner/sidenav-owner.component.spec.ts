import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidenavOwnerComponent } from './sidenav-owner.component';

describe('SidenavOwnerComponent', () => {
  let component: SidenavOwnerComponent;
  let fixture: ComponentFixture<SidenavOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavOwnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
