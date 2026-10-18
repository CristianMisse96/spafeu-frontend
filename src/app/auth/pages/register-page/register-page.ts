import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ValidadoresService } from '@shared/services/validadores.service';
import { FormUtils } from '@utils/forms-utils';
import { ToastrService } from 'ngx-toastr';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule,
            RouterLink,
            InputTextModule,
            PasswordModule,
            MessageModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterPage {

  fb = inject(FormBuilder);
  validadores = inject(ValidadoresService);
  private toast= inject(ToastrService);
  private router = inject(Router);
  formUtils= FormUtils;
  authService = inject(Auth);

  get passwordInputClass(): string {
    return this.formUtils.isValidField(this.registerForm, 'password') ? 'border-red-500' : '';
  }

  get password2InputClass(): string {
    const invalidField = this.formUtils.isValidField(this.registerForm, 'password2');
    const passwordsNotEqual = !!this.registerForm.errors?.['passwordsNotEquals'];
    return (invalidField || passwordsNotEqual) ? 'border-red-500' : '';
  }

  registerForm : FormGroup = this.fb.group({
    //name: ['',[Validators.required, Validators.pattern(FormUtils.namePattern)]],
    email: ['',[Validators.required, Validators.pattern(FormUtils.emailPattern)], [this.validadores.existeEmail.bind(this.validadores)]],
    username: ['',[Validators.required, Validators.minLength(6), Validators.pattern(FormUtils.notOnlySpacesPattern)],[this.validadores.existeUsername.bind(this.validadores)]],
    password: ['',[Validators.required, Validators.minLength(6)]],
    password2: ['',[Validators.required]]
  },{
    validators:[
      FormUtils.isFieldOneEqualFieldTwo('password','password2')
    ]
  });

   onSubmit() {
    if(this.registerForm.invalid || this.registerForm.pending){

      return Object.values(this.registerForm.controls).forEach(control=> {
        control.markAllAsTouched();
      });
    }

      this.authService.register(this.registerForm.value).subscribe({
      next: (resp:any)=>{console.log(resp);
        const mensaje = resp.mensaje.detail;
        this.toast.success(mensaje, resp.mensaje.summary, { timeOut: 3000 });
        this.router.navigateByUrl('/auth/login');
      }
    });

    }
}
