import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { FormUtils } from '@utils/forms-utils';
import { ToastrService } from 'ngx-toastr';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-reset-password-page',
  imports: [ReactiveFormsModule, PasswordModule, MessageModule],
  templateUrl: './reset-password-page.html',
  styleUrl: './reset-password-page.css',
})
export default class ResetPasswordPage {

   private fb = inject(FormBuilder);
   private activatedRoute = inject(ActivatedRoute);
   private router = inject(Router);
   private toast= inject(ToastrService);
   private authService = inject(Auth);

   formUtils= FormUtils;
   token = this.activatedRoute.snapshot.queryParamMap.get('token') ?? '';

   resetPasswordForm : FormGroup = this.fb.group({
          password: ['',[Validators.required, Validators.minLength(6)]],
          password2: ['',[Validators.required]]
        },{
          validators:[
          FormUtils.isFieldOneEqualFieldTwo('password','password2')
          ] 
        });

    onSubmit() {

      if (!this.token) {
        this.toast.error('El enlace no es válido o ha expirado.', 'Error', { timeOut: 3000 });

        // Redirigir después de que el toast se muestre
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);

        return;
      }

      if(this.resetPasswordForm.invalid){
          return Object.values(this.resetPasswordForm.controls).forEach(control=> {
            control.markAllAsTouched();
          });
       }

      const { password } = this.resetPasswordForm.value;

      this.authService.resetPassword(this.token, password)
        .subscribe({
          next: (resp:any) => {
            this.toast.success(resp.mensaje.detail,resp.mensaje.summary,{timeOut:3000});
            this.router.navigateByUrl('/auth/login');
          }
      });
    }

}
