import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Questionnaire } from './interfaces/questionnaire.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from './interfaces/question.interface';
import { QuestionnaireService } from '@dashboard-user/services/questionnaire.service';
import { StepperModule } from 'primeng/stepper';
import { StepProfile } from "./steps/step-profile/step-profile";
import { ButtonModule } from "primeng/button";
import { StepParQ } from "./steps/step-par-q/step-par-q";
import { StepPhysicalHistory } from "./steps/step-physical-history/step-physical-history";
import { CuestionarioEnum } from '@shared/enums/cuestionario.enum';
import { forkJoin } from 'rxjs';
import { CampusService } from '@dashboard-user/services/campus.service';
import { Campus } from './interfaces/campus.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormUtils } from '@utils/forms-utils';
import { UserHealthProfile } from './interfaces/user-health-profile.interface';
import { UserAnswer } from './interfaces/user-answer.interface';
import { UserHealthProfileService } from '@dashboard-user/services/user-health-profile.service';
import { Auth } from '@auth/services/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  imports: [StepperModule, StepProfile, ButtonModule, StepParQ, StepPhysicalHistory],
  templateUrl: './on-boarding.html',
  styleUrl: './on-boarding.css',
})
export default class OnBoarding implements OnInit {


  step = 1;
  fb = inject(FormBuilder);
  questionnaireService = inject(QuestionnaireService);
  campusService = inject(CampusService);
  userHealthProfileService = inject(UserHealthProfileService);
  authService = inject(Auth);
  toast = inject(ToastrService);
  router = inject(Router);

  formInfo: FormGroup = new FormGroup({});
  formParq: FormGroup = new FormGroup({});
  formHistory: FormGroup = new FormGroup({});

  questionnairesSig = toSignal(this.questionnaireService.getAllQuetionnaire(),{ initialValue: [] });
  campusesSig = toSignal(this.campusService.getAllCampusesWithPrograms(),{ initialValue: [] });

  parqQuestions = computed(() => this.questionnairesSig().find(q => q.name === CuestionarioEnum.PAR_Q)?.questions ?? []);
  historyQuestions = computed(() => this.questionnairesSig().find(q => q.name === CuestionarioEnum.HISTORIAL)?.questions ?? []);
  campuses= computed(() => this.campusesSig() ?? []);

  ngOnInit() {
    this.buildForms();
  }

  buildForms() {
    this.formInfo = this.fb.group({
      fullName: [null, [Validators.required, Validators.pattern(FormUtils.namePattern)]],
      campusId: [null, Validators.required],
      programId: [null, Validators.required],
      semester: [null, [Validators.required,Validators.min(1), Validators.max(12)]],
      birthDate: [null, Validators.required],
      sex: [null, Validators.required],
      weightKg: [null, Validators.required],
      heightM: [null, Validators.required],
      bmi: [{ value: '', disabled: true }]
    });

    this.formParq = this.fb.group({});
    this.formHistory = this.fb.group({});
  }

  constructor() {
  effect(() => {
    const parq = this.parqQuestions();
    const history = this.historyQuestions();

    if (parq.length && Object.keys(this.formParq.controls).length === 0) {
      this.createControls(parq, this.formParq);
    }

    if (history.length && Object.keys(this.formHistory.controls).length === 0) {
      this.createControls(history, this.formHistory);
    }
  });
}

  createControls(questions: Question[], form: FormGroup) {
    questions.forEach(q => {
      form.addControl(
        q.id.toString(),
        this.fb.control(null, Validators.required)
      );
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  finish() {
    const payload = this.buildPayload();
    this.userHealthProfileService.register(payload)
                                 .subscribe({
                                    next : (resp) =>{
                                      this.toast.info(resp.mensaje?.detail, resp.mensaje?.summary, {timeOut: 3000})
                                      this.router.navigateByUrl('/dashboard-user/home');
                                    }
                                  });
  }

  buildPayload(): UserHealthProfile {
    const info: UserHealthProfile = this.formInfo.value;

    const parqAnswers = this.mapAnswers(this.formParq.value);
    const historyAnswers = this.mapAnswers(this.formHistory.value);
    info.answers = [...parqAnswers, ...historyAnswers];

    return info;
     
  }

   mapAnswers(formValue: any): UserAnswer[] {
    return Object.entries(formValue).map(([questionId, optionId]) => ({
      questionId: Number(questionId),
      optionId: optionId as number
    }));
  }
}
