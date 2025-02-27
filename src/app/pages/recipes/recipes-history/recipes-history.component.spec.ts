import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesHistoryComponent } from './recipes-history.component';

describe('RecipesHistoryComponent', () => {
  let component: RecipesHistoryComponent;
  let fixture: ComponentFixture<RecipesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
