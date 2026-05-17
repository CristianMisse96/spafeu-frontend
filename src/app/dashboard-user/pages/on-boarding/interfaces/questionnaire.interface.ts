import { Question } from "./question.interface";

export interface Questionnaire {
  id: number;
  name: string;
  questions: Question[];
}