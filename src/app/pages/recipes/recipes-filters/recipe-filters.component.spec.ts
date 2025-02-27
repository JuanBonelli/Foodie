import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesFiltersComponent } from './recipe-filters.component';

describe('InventoryFiltersComponent', () => {
  let component: RecipesFiltersComponent;
  let fixture: ComponentFixture<RecipesFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
