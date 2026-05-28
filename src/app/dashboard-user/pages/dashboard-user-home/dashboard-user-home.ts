import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '@auth/services/auth';
import { ImcClassificationPipe } from "../../pipes/imc-classification.pipe";
import { toSignal } from '@angular/core/rxjs-interop';
import { PhysicalActivityProtocolService } from '@dashboard-user/services/physical-activity-protocol.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ExserciseService } from '@dashboard-user/services/exercise.service';

@Component({
  selector: 'app-dashboard-user-home',
  imports: [ButtonModule, ImcClassificationPipe],
  templateUrl: './dashboard-user-home.html',
  styleUrl: './dashboard-user-home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardUserHome {

  auth = inject(Auth)
  user = this.auth.usuario;
  physicalActivityService = inject(PhysicalActivityProtocolService);
  router = inject(Router);
  exerciseService = inject(ExserciseService);

  protocol = toSignal(this.physicalActivityService.findAllWithoutExercises(this.user()?.nivelActividadFisica!))

  /**
   * Cierra la sesión del usuario universitario o fisioterapeuta
   */
  logout(): void {
    this.auth.logout();
  }

  verEjercicios() {
    this.router.navigateByUrl('/dashboard-user/excercises')
  }
  
  completedIds = toSignal(
      this.exerciseService.getCompletedExerciseIds(),
      {
          initialValue: new Set<number>()
      }
    );

}
