import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EstadoKycEnum } from '@shared/enums/estadokyc.enum';
import { Auth } from '@auth/services/auth';
import { Header } from "@shared/components/header/header";

@Component({
  standalone:true,
  imports: [RouterOutlet, Header],
  templateUrl: './dashboard-user-layout.component.html',
  styleUrl: './dashboard-user-layout.component.css'
})
export class DashboardUserLayoutComponent {
 authService = inject(Auth);
 estadoUser = this.authService.estadoKyc();
 isAproved = this.estadoUser === EstadoKycEnum.APROBADO;

}
