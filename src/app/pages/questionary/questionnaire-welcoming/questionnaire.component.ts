import { Component, OnInit } from '@angular/core';

import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';


import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzButtonComponent } from 'ng-zorro-antd/button';
import { QuestionnaireWizardComponent } from '../questionnaire-wizard/questionnaire-wizard.component';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { AuthService, User } from '@auth0/auth0-angular';

@Component({
  selector: 'app-questionary',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    FormsModule,
    NzButtonComponent,
    QuestionnaireWizardComponent
  ],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
})
export class QuestionnaireComponent implements OnInit {
  user?: User | null;
  hasQuestionnaireBegan : boolean = false;
  userData = {
    name: 'Juan',
    lastname: 'Bonelli',
  };

  constructor(
    private topVisibilityService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
    private auth0Service: AuthService
  ) {}

  ngOnInit(): void {
    this.auth0Service.user$.subscribe((user) => {
      this.user = user;
    });
    this.topVisibilityService.hide();
    this.footerVisibilityService.hide();
  }

  displayQuestionnaire() {
    this.hasQuestionnaireBegan = true;
  }

}
