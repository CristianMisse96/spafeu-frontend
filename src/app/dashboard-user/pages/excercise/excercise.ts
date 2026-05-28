import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ExserciseService } from '@dashboard-user/services/exercise.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-excercise',
  imports: [TagModule, ButtonModule],
  templateUrl: './excercise.html',
  styleUrl: './excercise.css',
})
export class Excercise {

  readonly seconds = signal(0);
  private route = inject(ActivatedRoute);
  private user = inject(Auth).usuario;
  private interval!: ReturnType<typeof setInterval>;
  readonly running = signal(true);

  constructor() {

     
    effect((onCleanup) => {
      if (!this.running()) {
            return;
     }
     
      this.interval = setInterval(() => {

        this.seconds.update(v => v + 1);

      }, 1000);

      onCleanup(() => {

        clearInterval(this.interval);

      });

    });

  }


  exerciseService = inject(ExserciseService);

  exercise = toSignal(
    this.route.params.pipe(
      switchMap(params =>
        this.exerciseService.getExcersiseByIdAndNivelActividad(+params['id'], this.user()?.nivelActividadFisica!)
      )
    ),
    {
      initialValue: null
    }
  );

  readonly tiempoTranscurrido = computed(() => {

    const total = this.seconds();

    const hours = Math.floor(total / 3600)
      .toString()
      .padStart(2, '0');

    const minutes = Math.floor((total % 3600) / 60)
      .toString()
      .padStart(2, '0');

    const seconds = (total % 60)
      .toString()
      .padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;

  });

  finalizarSesion() {
    clearInterval(this.interval);
  }

  pausarSesion(): void {

    this.running.set(false);

  }  

  reanudarSesion(): void {

    this.running.set(true);

  }
}
