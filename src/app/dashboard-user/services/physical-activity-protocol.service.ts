import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { NivelActividadFisicaEnum } from '@shared/enums/nivel-actividadfisica.enum';
import { PhysicalActivityProtocol } from '@dashboard-user/interfaces/physical-activity-protocol.interface';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { MessagesService } from '@shared/services/messages.service';
import { ExerciseGroupedByActivityType } from '@dashboard-user/interfaces/exercise-by-activity-type.interface';
import { environment } from 'src/environments/environment';


const BASE_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PhysicalActivityProtocolService {

  private readonly http = inject(HttpClient);
  private readonly messages = inject(MessagesService);

  findAllWithoutExercises(nivelActividadFisica: NivelActividadFisicaEnum): Observable<PhysicalActivityProtocol> {

    const params = new HttpParams()
      .set('nivelActividadFisica', nivelActividadFisica);

    return this.http.get<RespuestaServicio<PhysicalActivityProtocol>>(
      `${BASE_URL}/physical-activity-protocols`,
      { params }
    ).pipe(
        map(resp => resp?.negocio!),
        catchError(this.messages.errorHandler)
    );
  }

  findExercisesByNivelActividad(nivelActividadFisica: NivelActividadFisicaEnum): Observable<ExerciseGroupedByActivityType[]> {
      const params = new HttpParams()
      .set('nivelActividadFisica', nivelActividadFisica);

    return this.http.get<RespuestaServicio<ExerciseGroupedByActivityType[]>>(
      `${BASE_URL}/physical-activity-protocols/exercises`,
      { params }
    ).pipe(
        map(resp => resp?.negocio!),
        catchError(this.messages.errorHandler)
    );
  }
}