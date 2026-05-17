import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Questionnaire } from '@dashboard-user/pages/on-boarding/interfaces/questionnaire.interface';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { MessagesService } from '@shared/services/messages.service';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL= environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {

  http = inject(HttpClient);
  messages = inject(MessagesService);

  getAllQuetionnaire(): Observable<Questionnaire[]>{
    return this.http.get<RespuestaServicio<Questionnaire[]>>(`${BASE_URL}/questionnaires/all`)
                    .pipe(
                      map(resp => resp.negocio || []),
                      catchError(this.messages.errorHandler)
                    );
  }
}
