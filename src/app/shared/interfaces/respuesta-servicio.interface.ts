import { Mensaje } from "./mensaje.interface";

export interface RespuestaServicio<T> {
  negocio?: T;
  mensajeDTO?: Mensaje;
  ok: boolean;
}