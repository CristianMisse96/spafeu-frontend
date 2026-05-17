import { Component, inject, OnInit, signal } from '@angular/core';
import { Questionnaire } from './interfaces/questionnaire.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from './interfaces/question.interface';
import { QuestionnaireService } from '@dashboard-user/services/questionnaire.service';
import { StepperModule } from 'primeng/stepper';
import { StepProfile } from "./steps/step-profile/step-profile";
import { ButtonModule } from "primeng/button";
import { StepParQ } from "./steps/step-par-q/step-par-q";
import { StepPhysicalHistory } from "./steps/step-physical-history/step-physical-history";

@Component({
  selector: 'app-on-boarding',
  imports: [StepperModule, StepProfile, ButtonModule, StepParQ, StepPhysicalHistory],
  templateUrl: './on-boarding.html',
  styleUrl: './on-boarding.css',
})
export class OnBoarding implements OnInit {
finish() {
throw new Error('Method not implemented.');
}

  step = 1;
  fb = inject(FormBuilder);
  questionnaireService = inject(QuestionnaireService);

  formInfo: FormGroup = new FormGroup({});
  formParq: FormGroup = new FormGroup({});
  formHistory: FormGroup = new FormGroup({});

  parqQuestions: Question[] = [];
  historyQuestions: Question[] = [];

  ngOnInit() {
    this.buildForms();
    this.loadQuestionnaires();
  }

  buildForms() {
    this.formInfo = this.fb.group({
      fullName: [null, Validators.required],
      campus: [null, Validators.required],
      program: [null, Validators.required],
      semester: [null, [Validators.required,Validators.min(1), Validators.max(10)]],
      birthDate: [null, Validators.required],
      sex: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      bmi: [{ value: '', disabled: true }]
    });

    this.formParq = this.fb.group({});
    this.formHistory = this.fb.group({});
  }

   loadQuestionnaires() {
    this.questionnaireService.getAllQuetionnaire().subscribe({
      next : (resp)=>{
         this.parqQuestions = resp.find(q => q.name === 'PAR-Q')?.questions || [];
         this.historyQuestions = resp.find(q => q.name === 'Historial')?.questions || [];

         this.createControls(this.parqQuestions, this.formParq);
         this.createControls(this.historyQuestions, this.formHistory);
      },
      
    })
  }

  createControls(questions: Question[], form: FormGroup) {
    questions.forEach(q => {
      form.addControl(
        q.id.toString(),
        this.fb.control(null, Validators.required)
      );
    });
  }
}
