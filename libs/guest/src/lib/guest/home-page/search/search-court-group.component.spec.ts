import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCourtGroupComponent } from './search-court-group.component';

describe('SearchCourtGroupComponent', () => {
  let component: SearchCourtGroupComponent;
  let fixture: ComponentFixture<SearchCourtGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCourtGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCourtGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
