import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesGeneratorComponent } from './recipes-generator.component';

describe('RecipesGeneratorComponent', () => {
  let component: RecipesGeneratorComponent;
  let fixture: ComponentFixture<RecipesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
