import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { FormUtils } from '@utils/forms-utils';
import { ToastrService } from 'ngx-toastr';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-forgot-password-page',
  imports: [ReactiveFormsModule, MessageModule, RouterLink],
  templateUrl: './forgot-password-page.html',
  styleUrl: './forgot-password-page.css',
})
export default class ForgotPasswordPage {

  formUtils= FormUtils;
  fb = inject(FormBuilder);
  authService = inject(Auth);
  router = inject(Router);
  toast= inject(ToastrService);

  forgotPasswordForm : FormGroup = this.fb.group({
    email: ['', [Validators.required,Validators.pattern(FormUtils.emailPattern)]]
  });

  onSubmit() {

    if(this.forgotPasswordForm.invalid || this.forgotPasswordForm.pending){

      return Object.values(this.forgotPasswordForm.controls).forEach(control=> {
        control.markAllAsTouched();
      });
    }
    const { email=''} = this.forgotPasswordForm.value;
    this.authService.forgotPassword(email).subscribe((resp :any)=>{
      this.toast.success(resp.mensaje.detail,resp.mensaje.summary,{timeOut:2500});
      this.router.navigateByUrl(`/auth/login`);
    })
  }
}
