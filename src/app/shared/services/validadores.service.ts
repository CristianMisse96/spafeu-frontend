import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url= environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {
  private http = inject(HttpClient);

      existeUsername(control: AbstractControl): Observable<ErrorValidate | null> {
      const username = control.value?.trim();

      if (!username) return of(null); // No valida si está vacío

      return timer(500).pipe( // Espera 500ms antes de hacer la petición
        switchMap(() =>
          this.http.get(`${base_url}/users/isusername/${username}`)
        ),
        map((resp: any) =>
          resp.negocio ? { existeUsername: true } : null
        ),
        catchError(() => of({ existeUsername: true })) // Por si falla la petición
      );
    }

      existeEmail(control: AbstractControl): Observable<ErrorValidate | null> {
      const email = control.value;

      if (!email) return of(null); // No valida si está vacío

      return timer(500).pipe( // Espera 500ms antes de hacer la petición
        switchMap(() =>
          this.http.get(`${base_url}/users/isemail/${email}`)
        ),
        map((resp: any) =>
          resp.negocio ? { existeEmail: true } : null
        ),
        catchError(() => of({ existeEmail: true })) // Por si falla la petición
      );
    }
}

interface ErrorValidate{
  [s:string] : boolean
}
