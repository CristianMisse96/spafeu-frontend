import { Component, input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-profile',
  imports: [],
  templateUrl: './step-profile.html',
  styleUrl: './step-profile.css',
})
export class StepProfile {

   parentForm = input.required<FormGroup<any>>();
}
