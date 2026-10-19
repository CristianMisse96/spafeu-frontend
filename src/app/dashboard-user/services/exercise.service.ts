import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NivelActividadFisicaEnum } from '@shared/enums/nivel-actividadfisica.enum';
import { RespuestaServicio } from '@shared/interfaces/respuesta-servicio.interface';
import { Exercise } from '@dashboard-user/interfaces/exercise.interface';
import { ExerciseCompletionResult } from '@dashboard-user/interfaces/exercise-completion-result.interface';
import { catchError, map } from 'rxjs';
import { MessagesService } from '@shared/services/messages.service';
import { Router } from '@angular/router';

const BASE_URL = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class ExserciseService {
    
    http = inject(HttpClient);
    messages = inject(MessagesService);
    router = inject(Router);
    
    getExcersiseByIdAndNivelActividad(excersiseId: number, nivelActividadFisica : NivelActividadFisicaEnum){

        const params = new HttpParams()
                        .set('nivelActividadFisica', nivelActividadFisica);

        return this.http.get<RespuestaServicio<Exercise>>(`${BASE_URL}/exercises/${excersiseId}`,{params})
                        .pipe(
                            map(resp => resp.negocio),
                             catchError((error) => {

                                this.router.navigate(['/dashboard-user/excercises']);

                                return this.messages.errorHandler(error);
                            })
                        )
    }

    getCompletedExerciseIds() {
    
        return this.http
            .get<RespuestaServicio<number[]>>(
                `${BASE_URL}/exercises/completed`
            )
            .pipe(
                map(resp => new Set<number>(resp.negocio))
            );

    }

    completeExerciseSession(exerciseId: number) {
       return this.http.patch<RespuestaServicio<ExerciseCompletionResult>>(
        `${BASE_URL}/exercises/${exerciseId}/complete`,
        null
    )
    }
    
}