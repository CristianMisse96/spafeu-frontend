import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '@auth/services/auth';
import { FormUtils } from '@utils/forms-utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

   
  readonly MENSAJE_SIN_CONEXION =
            'No se ha podido establecer una conexión con el servidor, por favor intente mas tarde.';
  
  readonly TITULO_SIN_CONEXION = '¡Sin conexión!';

  formUtils= FormUtils;
  fb = inject(FormBuilder);
  authService = inject(Auth);
  router = inject(Router);
  toast= inject(ToastrService);

   loginForm : FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  onSubmit(){
     if(this.loginForm.invalid){
        return Object.values(this.loginForm.controls).forEach(control=> {
        control.markAllAsTouched();
      });
    }

      //realizar login
    this.authService.login(this.loginForm.value)
      .subscribe({
        next: (resp) => {

          const remember = this.loginForm.get('remember')?.value;
          const email = this.loginForm.get('username')?.value ?? '';

          remember? localStorage.setItem('email', email) : localStorage.removeItem('email');
         
          this.router.navigateByUrl('/dashboard-user');
          this.toast.success(`has iniciado sesión con éxito`,
            'Login!!!', { timeOut: 3000 });
            
        },
        error: (err) => {console.log(err)
          if (err.error.error === 'Bad credentials' || err.error.error==='User is disabled') {
            this.toast.error(err.error.message, 'Error', { timeOut: 3000 });
          }else if(err.status ===0){
              this.toast.error(this.MENSAJE_SIN_CONEXION, this.TITULO_SIN_CONEXION, { timeOut: 3000 });
          }else{
            this.toast.warning(err.error.error, 'Alerta!!!', { timeOut: 3000 });
          }
        },
      })

  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){ 

        this.toast.info(`${this.authService.usuario()?.username}, ya estas autenticado!`, 'Login',{ timeOut: 3000 });
        this.router.navigateByUrl('/');
    }
  }
}
