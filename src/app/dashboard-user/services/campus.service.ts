import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Campus } from '@dashboard-user/pages/on-boarding/interfaces/campus.interface';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { MessagesService } from '@shared/services/messages.service';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class CampusService {
  
  http = inject(HttpClient);
  messages = inject(MessagesService);

  getAllCampusesWithPrograms(): Observable<Campus[]> {
     return this.http.get<RespuestaServicio<Campus[]>>(`${BASE_URL}/campuses`)
                    .pipe(
                      map(resp => resp.negocio || []),
                      catchError(this.messages.errorHandler)
                    );
   }
}
