import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserHealthProfile } from '@dashboard-user/pages/on-boarding/interfaces/user-health-profile.interface';
import { environment } from 'src/environments/environment';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, tap } from 'rxjs';
import { Auth } from '@auth/services/auth';
import { MessagesService } from '@shared/services/messages.service';
import { EstadoKycEnum } from '@shared/enums/estadokyc.enum';

const BASE_URL = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class UserHealthProfileService {
    
    private http = inject(HttpClient);
    private messages = inject(MessagesService);
    private authService = inject(Auth);

    register(userHealtProfile : UserHealthProfile){

        return this.http.post<RespuestaServicio<User>>(`${BASE_URL}/user/health-profile/register`,userHealtProfile)
                        .pipe(
                            tap(resp=> {
                                 const partialUser: Partial<User> = {
                                    estadoKyc: resp.negocio?.estadoKyc,
                                    bmi: resp.negocio?.bmi,
                                    heightM: resp.negocio?.heightM,
                                    weightKg: resp.negocio?.weightKg,
                                    nivelActividadFisica: resp.negocio?.nivelActividadFisica,
                                    nombreCompleto: resp.negocio?.nombreCompleto
                                };
                                this.authService.actualizarUsuario(partialUser);
                            }),
                            catchError(this.messages.errorHandler)
                        );
    }
}