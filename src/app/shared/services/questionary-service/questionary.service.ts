import { Injectable } from '@angular/core';
import { QuestionAnswer, Questionnaire } from '../../../types/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient) { }

  postQuestionAnswer(answers: QuestionAnswer[]) {
    return this.http.post<any>(`${environment.baseUrl}/api/questionary/answer`, answers);
  }

  getQuestionnaires() {
    return this.http.get<Questionnaire[]>(`${environment.baseUrl}/api/questionary`);
  }


  getMockQuestionnaire(): Questionnaire[] {
    let mockQuestionnaire: Questionnaire[] = [
      {
        id: 0,
        name: "MAIN_QUESTIONARY",
        isActive: true,
        questions: [
          {
            id: 1,
            questionType: "SINGLE_CHOICE",
            statement: "¿Tienes alguna alergia alimentaria?",
            isActive: true,
            options: [
              {
                id: 1,
                product_id: 0,
                product_category_id: 0,
                label: "Gluten",
                isActive: true
              },
              {
                id: 2,
                product_id: 0,
                product_category_id: 0,
                label: "Frutos Secos",
                isActive: true
              },
              {
                id: 3,
                product_id: 0,
                product_category_id: 0,
                label: "Lácteos",
                isActive: true
              },
              {
                id: 4,
                product_id: 0,
                product_category_id: 0,
                label: "No Tengo",
                isActive: true
              }
            ]
          },
          {
            id: 2,
            questionType: "MULTIPLE_CHOICE",
            statement: "¿Qué tipo de edulcorante prefieres?",
            isActive: true,
            options: [
              {
                id: 1,
                product_id: 0,
                product_category_id: 0,
                label: "Azúcar",
                isActive: true
              },
              {
                id: 2,
                product_id: 0,
                product_category_id: 0,
                label: "Miel",
                isActive: true
              },
              {
                id: 3,
                product_id: 0,
                product_category_id: 0,
                label: "Edulcorantes Artificiales",
                isActive: true
              },
              {
                id: 4,
                product_id: 0,
                product_category_id: 0,
                label: "No Utilizo",
                isActive: true
              }
            ]
          },
          {
            id: 3,
            questionType: "SINGLE_CHOICE",
            statement: "¿Qué tan importante es para ti el contenido nutricional de los alimentos?",
            isActive: true,
            options: [
              {
                id: 1,
                product_id: 0,
                product_category_id: 0,
                label: "Muy Importante",
                isActive: true
              },
              {
                id: 2,
                product_id: 0,
                product_category_id: 0,
                label: "Algo Importante",
                isActive: true
              },
              {
                id: 3,
                product_id: 0,
                product_category_id: 0,
                label: "Poco Importante",
                isActive: true
              },
              {
                id: 4,
                product_id: 0,
                product_category_id: 0,
                label: "No Me Preocupa",
                isActive: true
              }
            ]
          }
        ]
      }
    ]

    return mockQuestionnaire;
  }
}