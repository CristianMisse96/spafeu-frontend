import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { UserLevelHistory } from '@dashboard-user/interfaces/user-level-history.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';
import { MessagesService } from '@shared/services/messages.service';

const BASE_URL = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class UserLevelHistoryService {
    
    http = inject(HttpClient);
    messages = inject(MessagesService);

    getUserLevelHistory() {
      return this.http
                 .get<RespuestaServicio<UserLevelHistory[]>>(`${BASE_URL}/user-level-history`)
                 .pipe(
                    map(resp => resp.negocio ?? []),
                    catchError(this.messages.errorHandler),
                 )
    }
    
    
}
