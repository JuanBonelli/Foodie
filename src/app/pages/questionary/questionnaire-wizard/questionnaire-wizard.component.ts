import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { Question, QuestionAnswer, Questionnaire } from '../../../types/types';
import { FooterVisibilityService } from '../../../shared/services/footer-visibility-service/footer-visibility.service';
import { QuestionnaireService } from '../../../shared/services/questionary-service/questionary.service';
import { TopbarConfigurationService } from '../../../shared/services/topbar-configuration-service/topbar-configuration.service';
import { UserService } from '../../../shared/services/user-service/user.service';

@Component({
  selector: 'app-questionnaire-wizard',
  standalone: true,
  imports: [NzButtonModule, NzStepsModule, NgFor, NgIf, NzSpinModule],
  templateUrl: './questionnaire-wizard.component.html',
  styleUrl: './questionnaire-wizard.component.scss',
})
export class QuestionnaireWizardComponent implements OnInit {
  @Input() hasQuestionnaireBegan: boolean = false;

  currentStep: number = 0;
  questionnaire: Questionnaire[] = [];
  answers: QuestionAnswer[] = [];
  hasBeenQuestionAnswered: boolean = false;
  isLoading: boolean = true;

  constructor(
    private topbarConfigurationService: TopbarConfigurationService,
    private footerVisibilityService: FooterVisibilityService,
    private questionnaireService: QuestionnaireService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.topbarConfigurationService.hide();
    this.footerVisibilityService.hide();

    this.questionnaireService.getQuestionnaires().subscribe((res) => {
      this.questionnaire = res;
      this.isLoading = false;
    });
  }

  nextStep() {
    this.currentStep++;
    this.hasBeenQuestionAnswered = false;
  }

  previousStep() {
    this.currentStep--;
  }

  done() {
    this.isLoading = true;
    this.userService.createUserFromAuth0().subscribe({
      next: (res: any) => {
        this.questionnaireService.postQuestionAnswer(this.answers).subscribe({
          next: (res: any) => {
            this.router.navigateByUrl('/');
            this.isLoading = false;
          },
          error: (err: any) => {
            console.error(err);
            this.isLoading = false;
            //TODO RETRY
          },
        });
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        //TODO: retry | show modal error
      },
    });
  }

  getCurrentQuestion(): Question {
    return this.questionnaire[0].questions[this.currentStep];
  }

  toggleSelectionState(questionId: number) {
    const question = this.answers.find(
      (answer: QuestionAnswer) => answer.questionId === questionId
    );

    this.hasBeenQuestionAnswered = question
      ? question.questionOptionsId.length > 0
      : false;
  }

  onOptionSelected(selectedOptionId: number, questionId: number) {
    const questionAnswer: QuestionAnswer = this.createQuestionAnswer(
      questionId,
      selectedOptionId
    );

    if (this.isFirstAnswerToQuestion(questionId)) {
      this.addNewAnswer(questionAnswer);
    } else if (this.isDoubleCheckedAnswer(questionId, selectedOptionId)) {
      this.handleDoubleCheckedAnswer(questionId, selectedOptionId);
    } else if (this.isMultipleChoiceQuestion(questionId)) {
      this.addMultipleChoiceAnswer(questionId, selectedOptionId);
    } else {
      this.updateSingleChoiceAnswer(questionId, selectedOptionId);
    }

    this.toggleSelectionState(questionId);
  }

  createQuestionAnswer(
    questionId: number,
    selectedOptionId: number
  ): QuestionAnswer {
    return {
      questionId: questionId,
      questionOptionsId: [selectedOptionId],
    };
  }

  isFirstAnswerToQuestion(questionId: number): boolean {
    let question = this.answers.find(
      (answer: QuestionAnswer) => answer.questionId === questionId
    )!;
    let indexOfQuestion: number = this.answers.indexOf(question);

    return indexOfQuestion === -1;
  }

  addNewAnswer(questionAnswer: QuestionAnswer): void {
    this.answers.push(questionAnswer);
  }

  isDoubleCheckedAnswer(questionId: number, selectedOptionId: number) {
    let question = this.answers.find(
      (answer: QuestionAnswer) => answer.questionId === questionId
    );
    return question?.questionOptionsId.includes(selectedOptionId);
  }

  handleDoubleCheckedAnswer(
    questionId: number,
    selectedOptionId: number
  ): void {
    const question = this.findAnswerByQuestionId(questionId);
    const indexOfOption = question.questionOptionsId.indexOf(selectedOptionId);
    const indexOfQuestion = this.answers.indexOf(question);

    if (this.answers[indexOfQuestion].questionOptionsId.length > 1) {
      this.answers[indexOfQuestion].questionOptionsId.splice(indexOfOption, 1);
    } else {
      this.answers.splice(indexOfQuestion, 1);
    }
  }

  isMultipleChoiceQuestion(questionId: number): boolean {
    let question = this.questionnaire[0].questions.find(
      (question: Question) => question.id === questionId
    );
    return question?.questionType === 'MULTIPLE_CHOICE';
  }

  addMultipleChoiceAnswer(questionId: number, selectedOptionId: number): void {
    const question = this.findAnswerByQuestionId(questionId);
    const indexOfQuestion = this.answers.indexOf(question);
    this.answers[indexOfQuestion].questionOptionsId.push(selectedOptionId);
  }

  updateSingleChoiceAnswer(questionId: number, selectedOptionId: number): void {
    const question = this.findAnswerByQuestionId(questionId);
    const indexOfQuestion = this.answers.indexOf(question);
    this.answers[indexOfQuestion].questionOptionsId = [selectedOptionId];
  }

  isOptionSelected(optionId: number, questionId: number): boolean {
    return this.answers.some(
      (answer: QuestionAnswer) =>
        answer.questionId === questionId &&
        answer.questionOptionsId.includes(optionId)
    );
  }

  findAnswerByQuestionId(questionId: number): QuestionAnswer {
    return this.answers.find(
      (answer: QuestionAnswer) => answer.questionId === questionId
    )!;
  }
}
