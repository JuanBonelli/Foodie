import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ingredientDetailComponent } from './recipe-detail.component';


describe('RecipeDetailComponent', () => {
  let component: ingredientDetailComponent;
  let fixture: ComponentFixture<ingredientDetailComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ingredientDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ingredientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
