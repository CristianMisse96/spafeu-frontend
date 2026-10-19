import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth } from '@auth/services/auth';
import { PhysicalActivityProtocolService } from '@dashboard-user/services/physical-activity-protocol.service';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { Router } from '@angular/router';
import { ExserciseService } from '@dashboard-user/services/exercise.service';

@Component({
  selector: 'app-excersise-list',
  imports: [TagModule, CardModule, ButtonModule],
  templateUrl: './excersise-list.html',
  styleUrl: './excersise-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExcersiseList {


  user = inject(Auth).usuario;
  physicalActivityProtocolService = inject(PhysicalActivityProtocolService);
  exerciseService = inject(ExserciseService);
  router= inject(Router);

  excercisesGroup = toSignal(this.physicalActivityProtocolService
                                 .findExercisesByNivelActividad(this.user()?.nivelActividadFisica!), {initialValue : []});

  completedIds = toSignal(
    this.exerciseService.getCompletedExerciseIds(),
    {
        initialValue: new Set<number>()
    }
  );

  iniciarEjercicio(excersiseId: number) {
    this.router.navigate(['/dashboard-user/excercise', excersiseId]);
  }

  calularInfo(id: number): ButtonSeverity {
    return this.completedIds().has(id) ? 'success' : 'primary';
  }
}
