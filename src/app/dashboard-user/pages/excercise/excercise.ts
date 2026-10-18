import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ExserciseService } from '@dashboard-user/services/exercise.service';
import { NivelActividadFisicaEnum, obtenerKeyPorValor } from '@shared/enums/nivel-actividadfisica.enum';
import { ToastrService } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-excercise',
  imports: [TagModule, ButtonModule, NgOptimizedImage],
  templateUrl: './excercise.html',
  styleUrl: './excercise.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class Excercise {

  readonly seconds = signal(0);
  private route = inject(ActivatedRoute);
  private auth = inject(Auth);
  private user = this.auth.usuario;
  private interval!: ReturnType<typeof setInterval>;
  readonly running = signal(true);
  toast = inject(ToastrService);
  router = inject(Router);

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

  readonly exerciseImageUrl = computed(() => {
    const exercise = this.exercise();
    const nivel = this.user()?.nivelActividadFisica;
    if (!exercise || !nivel) {
      return null;
    }

    const nivelKey = this.resolveNivelKey(nivel);
    if (!nivelKey) {
      return null;
    }

    return `/images/protocolo/${nivelKey}/${exercise.id}.jpg`;
  });

  private resolveNivelKey(nivel: string): string | null {
    const keys = Object.keys(NivelActividadFisicaEnum) as Array<keyof typeof NivelActividadFisicaEnum>;
    if (keys.includes(nivel as keyof typeof NivelActividadFisicaEnum)) {
      return nivel;
    }

    return obtenerKeyPorValor(nivel) ?? null;
  }

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
    const exerciseId = this.exercise()?.id;
    if (!exerciseId) return;

    this.exerciseService
      .completeExerciseSession(exerciseId)
      .subscribe({
        next: (resp) => {
          const resultado = resp.negocio;

          if (resultado?.ultimoNivel) {
            this.toast.success(resp.mensaje?.detail ?? '¡Felicitaciones!', resp.mensaje?.summary ?? 'Completado');
            this.router.navigateByUrl('/dashboard-user/home');
            return;
          }

          if (resultado?.subioNivel && resultado.nivelNuevo) {
            this.auth.actualizarUsuario({ nivelActividadFisica: resultado.nivelNuevo });
            this.toast.success(resp.mensaje?.detail ?? '¡Subiste de nivel!', resp.mensaje?.summary ?? 'Nivel completado');
            this.router.navigateByUrl('/dashboard-user/excercises');
            return;
          }

          this.toast.info(resp.mensaje?.detail, resp.mensaje?.summary, { timeOut: 3000 });
          this.router.navigateByUrl('/dashboard-user/excercises');
        }
      });
  }

  pausarSesion(): void {

    this.running.set(false);

  }  

  reanudarSesion(): void {

    this.running.set(true);

  }
}
