import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '@utils/forms-utils';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SexEnum } from '@shared/enums/sex.enum';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { Campus } from '../../interfaces/campus.interface';
import { AcademicProgram } from '../../interfaces/academic-program.interface';

@Component({
  selector: 'app-step-profile',
  imports: [ReactiveFormsModule, 
            MessageModule, 
            InputTextModule, 
            SelectModule,
            DatePickerModule,
            RadioButtonModule,
            InputNumberModule
            ],
  templateUrl: './step-profile.html',
  styleUrl: './step-profile.css',
})
export class StepProfile {
   
   today: Date = new Date();

   parentForm = input.required<FormGroup<any>>();
   campusList = input.required<Campus[]>();
   formUtils = FormUtils;


  allPrograms = [
    { id: 1, campusId: 1, name: 'Engineering' },
    { id: 2, campusId: 1, name: 'Medicine' },
    { id: 3, campusId: 2, name: 'Business' },
    { id: 4, campusId: 2, name: 'Law' }
  ];

  sexOptions = [
  { label: 'Hombre', value: SexEnum.MALE },
  { label: 'Mujer', value: SexEnum.FEMALE }
];

  programList:  AcademicProgram[] = [];

  ngOnInit() {
      this.parentForm().get('campus')?.valueChanges.subscribe((campusId: number) => {
   
      this.parentForm().get('program')?.reset();
    
      const selectedCampus = this.campusList().find(c => c.id === campusId);

      this.programList = selectedCampus?.academicPrograms || [];
    });
  }

  semesterOptions = Array.from({ length: 10 }, (_, i) => i + 1);
}
