import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Auth } from '@auth/services/auth';
import { ImcClassificationPipe } from "../../pipes/imc-classification.pipe";
import { toSignal } from '@angular/core/rxjs-interop';
import { PhysicalActivityProtocolService } from '@dashboard-user/services/physical-activity-protocol.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard-user-home',
  imports: [ButtonModule, ImcClassificationPipe],
  templateUrl: './dashboard-user-home.html',
  styleUrl: './dashboard-user-home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUserHome {
  
  user = inject(Auth).usuario();
  physicalActivityService = inject(PhysicalActivityProtocolService);

  protocol = toSignal(this.physicalActivityService.findAllWithoutExercises(this.user?.nivelActividadFisica!))

  /**
   * Cierra la sesión del usuario universitario o fisioterapeuta
   */
   logout(): void {
    console.log('Cerrando sesión en la plataforma deportiva...');
    // Aquí agregas tu lógica de redirección o limpieza de tokens (AuthService, etc.)
  }

}
