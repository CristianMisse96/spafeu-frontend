import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ToastrService } from 'ngx-toastr';

/**
 * Página de activación de cuenta.
 *
 * Lee el token de activación desde los query params, invoca al backend y
 * presenta los estados de carga, éxito o error.
 */
@Component({
  selector: 'app-activate-account-page',
  imports: [RouterLink],
  templateUrl: './activate-account-page.html',
  styleUrl: './activate-account-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ActivateAccountPage implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(Auth);
  private readonly toast = inject(ToastrService);

  readonly isLoading = signal(true);
  readonly isSuccess = signal(false);
  readonly errorMessage = signal<string | null>(null);

  private redirectTimer?: ReturnType<typeof setTimeout>;

  /**
   * Inicia la activación de cuenta si existe un token válido en la URL.
   */
  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token') ?? '';

    if (!token) {
      this.errorMessage.set('El enlace de activación no es válido.');
      this.isLoading.set(false);
      return;
    }

    this.authService.activateAccount(token).subscribe({
      next: (resp: any) => {
        this.isSuccess.set(true);
        this.isLoading.set(false);
        this.toast.success(
          resp.mensaje?.detail ?? 'Cuenta activada correctamente.',
          resp.mensaje?.summary ?? 'Éxito',
          { timeOut: 3000 }
        );

        this.redirectTimer = setTimeout(() => {
          this.router.navigateByUrl('/auth/login');
        }, 4000);
      },
      error: () => {
        this.errorMessage.set(
          'El enlace de activación es inválido, ha expirado o ya fue usado.'
        );
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Limpia el temporizador de redirección si el componente se destruye antes de tiempo.
   */
  ngOnDestroy(): void {
    if (this.redirectTimer) {
      clearTimeout(this.redirectTimer);
    }
  }
}
