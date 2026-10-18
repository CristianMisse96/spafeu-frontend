import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { FormUtils } from '@utils/forms-utils';
import { ToastrService } from 'ngx-toastr';
import { MessageModule } from 'primeng/message';

/**
 * Página para solicitar el reenvío del correo de activación.
 *
 * Permite al usuario ingresar su correo institucional y solicitar un nuevo
 * enlace de activación.
 */
@Component({
  selector: 'app-resend-activation-page',
  imports: [ReactiveFormsModule, MessageModule, RouterLink],
  templateUrl: './resend-activation-page.html',
  styleUrl: './resend-activation-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ResendActivationPage {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(Auth);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastrService);

  readonly formUtils = FormUtils;

  resendForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)]],
  });

  /**
   * Envía la solicitud para reenviar el correo de activación.
   */
  onSubmit(): void {
    if (this.resendForm.invalid || this.resendForm.pending) {
      Object.values(this.resendForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });
      return;
    }

    const { email = '' } = this.resendForm.value;

    this.authService.resendActivationEmail(email).subscribe((resp: any) => {
      this.toast.success(
        resp.mensaje?.detail ?? 'Correo enviado',
        resp.mensaje?.summary ?? 'Éxito',
        { timeOut: 2500 }
      );
      this.router.navigateByUrl('/auth/login');
    });
  }
}
