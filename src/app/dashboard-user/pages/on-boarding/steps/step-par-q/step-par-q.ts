import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../interfaces/question.interface';
import { RadioButtonModule } from "primeng/radiobutton";

@Component({
  selector: 'app-step-par-q',
  imports: [ReactiveFormsModule, RadioButtonModule],
  templateUrl: './step-par-q.html',
  styleUrl: './step-par-q.css',
})
export class StepParQ {

  formGroup= input.required<FormGroup<any>>();
  questions= input.required<Question[]>();
}
