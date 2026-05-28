import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { UserProgressDashboard } from '@dashboard-user/interfaces/user-progress.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';
import { MessagesService } from '@shared/services/messages.service';

const BASE_URL = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class UserProgressService {
    
    http = inject(HttpClient);
    messages = inject(MessagesService);

    getDashboard() {
      return this.http
                 .get<RespuestaServicio<UserProgressDashboard>>(`${BASE_URL}/user-exercise-sessions/dashboard`)
                 .pipe(
                    map(resp => resp.negocio),
                    catchError(this.messages.errorHandler),
                 )
    }
    
    
}