import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserProgressDashboard } from '@dashboard-user/interfaces/user-progress.interface';
import { UserProgressService } from '@dashboard-user/services/user-progress.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-seguimiento',
  imports: [TagModule, DatePipe],
  templateUrl: './seguimiento.html',
  styleUrl: './seguimiento.css',
})
export default class Seguimiento {

  private readonly userProgressService =
    inject(UserProgressService);

  readonly progress = toSignal(this.userProgressService.getDashboard(), {initialValue : null});

  readonly totalSesiones = computed(() =>
    this.progress()?.totalSesiones ?? 0
  );

  readonly minutosAcumulados = computed(() =>
    this.progress()?.totalMinutos ?? 0
  );

  readonly sesionesRecientes = computed(() =>
    this.progress()?.sesionesRecientes ?? []
  );
}
