import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireWizardComponent } from './questionnaire-wizard.component';

describe('QuestionnaireWizardComponent', () => {
  let component: QuestionnaireWizardComponent;
  let fixture: ComponentFixture<QuestionnaireWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
