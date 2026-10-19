import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private router: Router) {}

    /**
     * Muestra un diálogo de error genérico para fallos de conexión o del servidor.
     *
     * Los códigos 401 y 403 NO se muestran aquí porque son gestionados de forma
     * específica por el interceptor de autenticación (`auth.interceptor.ts`):
     * - 401: intenta renovar el token; si falla, cierra sesión y redirige al login.
     * - 403: muestra advertencia y redirige al inicio del usuario.
     *
     * @param error Error HTTP recibido desde el backend.
     */
    errorHandler(error: HttpErrorResponse) {
        const TITULO_SIN_CONEXION = '¡Sin conexión!';
        const MENSAJE_SIN_CONEXION =
            'No se ha podido establecer una conexión con el servidor, por favor intente mas tarde.';
        const TITULO_ERROR_PETICION = 'Falla técnica';
        const MENSAJE_ERROR_PETICION =
            'Ocurrió un error procesando su solicitud o su sesión ha caducado, ingrese nuevamente.';

        if (error.status === 0) {

            Swal.fire({
                html:
                    '<h3>' +
                    TITULO_SIN_CONEXION +
                    '</h3><p class="text-dialog">' +
                    MENSAJE_SIN_CONEXION +
                    '</p>',
                imageUrl: '/images/icono-sin-conexion.svg',
                confirmButtonText: 'Aceptar',
                showCloseButton: true
            });
        } else if(error.status != 403 && error.status != 401){
            const titulo = error.error.mensaje ? error.error.mensaje.summary : TITULO_ERROR_PETICION;
            const mensaje = error.error.mensaje ? error.error.mensaje.detail : MENSAJE_ERROR_PETICION;
            Swal.fire({
                html: '<h3>' + titulo + '</h3><p class="text-dialog">' + mensaje + '</p>',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                showCloseButton: true
            });
        }
        return throwError(()=> error?.error?.mensaje || 'server error.');
    }

    /**
     * Muestra un mensaje de éxito
     * @param mensaje Mensaje a mostrar
     * @param titulo Título del mensaje (opcional)
     */
    showSuccess(mensaje: string, titulo: string = 'Éxito') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            timer: 3000,
            timerProgressBar: true
        });
    }

    /**
     * Muestra un mensaje de error
     * @param mensaje Mensaje a mostrar
     * @param titulo Título del mensaje (opcional)
     */
    showError(mensaje: string, titulo: string = 'Error') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }

    /**
     * Muestra un mensaje de advertencia
     * @param mensaje Mensaje a mostrar
     * @param titulo Título del mensaje (opcional)
     */
    showWarning(mensaje: string, titulo: string = 'Advertencia') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }

    /**
     * Muestra un mensaje informativo
     * @param mensaje Mensaje a mostrar
     * @param titulo Título del mensaje (opcional)
     */
    showInfo(mensaje: string, titulo: string = 'Información') {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    }
}
