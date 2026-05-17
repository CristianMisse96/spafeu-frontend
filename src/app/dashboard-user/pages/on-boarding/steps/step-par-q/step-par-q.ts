import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-step-par-q',
  imports: [],
  templateUrl: './step-par-q.html',
  styleUrl: './step-par-q.css',
})
export class StepParQ {

  formGroup= input.required<FormGroup<any>>();
  questions= input.required<Question[]>();
}
