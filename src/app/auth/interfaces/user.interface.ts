import { EstadoKycEnum } from "@shared/enums/estadokyc.enum";
import { Role } from "./role.interface";
import { NivelActividadFisicaEnum } from "@shared/enums/nivel-actividadfisica.enum";

export interface User {
  id: number;
  username?: string | null;
  email?: string | null;
  nombreCompleto: string;
  foto?: string | null;
  enabled?: boolean | null;
  roles: Role[];
  estadoKyc:  EstadoKycEnum;
  weightKg?: number;
  heightM?: number;
  bmi?: number;
  nivelActividadFisica?: NivelActividadFisicaEnum;
}
