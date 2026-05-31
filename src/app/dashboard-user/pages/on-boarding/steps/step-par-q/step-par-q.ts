import { Component, input, OnInit, OnDestroy, inject } from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Question } from '../../interfaces/question.interface';
import { RadioButtonModule } from "primeng/radiobutton";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

const parqNoYesValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const group = control as FormGroup;
  const values = Object.values(group.value);
  const hasYes = values.some(v => v === 1);
  return hasYes ? { hasYesResponse: true } : null;
};

@Component({
  selector: 'app-step-par-q',
  imports: [ReactiveFormsModule, RadioButtonModule],
  templateUrl: './step-par-q.html',
  styleUrl: './step-par-q.css',
})
export class StepParQ implements OnInit, OnDestroy {

  formGroup = input.required<FormGroup<any>>();
  questions = input.required<Question[]>();

  private toast = inject(ToastrService);
  private valueChangesSub: Subscription | null = null;

  ngOnInit() {
    const group = this.formGroup();

    group.setValidators(parqNoYesValidator);
    group.updateValueAndValidity();

    let previouslyInvalidDueToYes = false;

    this.valueChangesSub = group.valueChanges.subscribe(() => {
      const currentlyInvalidDueToYes = group.hasError('hasYesResponse');

      if (currentlyInvalidDueToYes && !previouslyInvalidDueToYes) {
        this.toast.warning(
          'Se recomienda que consulte con un profesional de la salud antes de iniciar un programa de actividad física',
          'Advertencia',
          { timeOut: 5000 }
        );
      }

      previouslyInvalidDueToYes = currentlyInvalidDueToYes;
    });
  }

  ngOnDestroy() {
    this.valueChangesSub?.unsubscribe();
  }
}
