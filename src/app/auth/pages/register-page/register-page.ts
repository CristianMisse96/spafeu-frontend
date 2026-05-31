import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { ValidadoresService } from '@shared/services/validadores.service';
import { FormUtils } from '@utils/forms-utils';
import { ToastrService } from 'ngx-toastr';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, 
            CardModule, 
            ButtonModule, 
            PasswordModule, 
            InputTextModule,
            MessageModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export default class RegisterPage {

  fb = inject(FormBuilder);
  validadores = inject(ValidadoresService);
  private toast= inject(ToastrService);
  private router = inject(Router);
  formUtils= FormUtils;
  authService = inject(Auth);
  
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
        const mensaje= resp.mensaje.detail + ' Por favor inicie sesión con sus credenciales.';
        this.toast.success(mensaje,resp.mensaje.summary,{timeOut:3000});
        this.router.navigateByUrl('/auth/login');
      }
    });

    }
}
