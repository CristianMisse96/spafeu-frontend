import { Mensaje } from "./mensaje.interface";

export interface RespuestaServicio<T> {
  negocio?: T;
  mensaje?: Mensaje;
  ok: boolean;
}