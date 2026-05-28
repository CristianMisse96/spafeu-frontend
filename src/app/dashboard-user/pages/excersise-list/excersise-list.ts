import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth } from '@auth/services/auth';
import { PhysicalActivityProtocolService } from '@dashboard-user/services/physical-activity-protocol.service';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excersise-list',
  imports: [TagModule, CardModule, ButtonModule],
  templateUrl: './excersise-list.html',
  styleUrl: './excersise-list.css',
})
export class ExcersiseList {

  user = inject(Auth).usuario;
  exercises = inject(PhysicalActivityProtocolService);
  router= inject(Router);

  excercisesGroup = toSignal(this.exercises.findExercisesByNivelActividad(this.user()?.nivelActividadFisica!), {initialValue : []});

  iniciarEjercicio(excersiseId: number) {
    this.router.navigate(['/dashboard-user/excercise', excersiseId]);
  }
}
