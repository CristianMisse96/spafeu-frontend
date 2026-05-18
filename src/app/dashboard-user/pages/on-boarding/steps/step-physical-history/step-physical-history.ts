import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Question } from '../../interfaces/question.interface';
import { SelectModule } from "primeng/select";

@Component({
  selector: 'app-step-physical-history',
  imports: [ReactiveFormsModule, SelectModule],
  templateUrl: './step-physical-history.html',
  styleUrl: './step-physical-history.css',
})
export class StepPhysicalHistory {

  formGroup= input.required<FormGroup<any>>();
  questions= input.required<Question[]>();
}
