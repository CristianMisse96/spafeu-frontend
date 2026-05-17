import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '../../interfaces/question.interface';

@Component({
  selector: 'app-step-physical-history',
  imports: [],
  templateUrl: './step-physical-history.html',
  styleUrl: './step-physical-history.css',
})
export class StepPhysicalHistory {

  formGroup= input.required<FormGroup<any>>();
  questions= input.required<Question[]>();
}
