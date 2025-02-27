import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ingredientCardComponent } from './ingredient-card.component';
describe('RecipeCardComponent', () => {
  let component: ingredientCardComponent;
  let fixture: ComponentFixture<ingredientCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ingredientCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ingredientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
