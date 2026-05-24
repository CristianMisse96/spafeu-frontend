import { EstadoKycEnum } from "@shared/enums/estadokyc.enum";
import { Role } from "./role.interface";

export interface User {
  id: number;
  username?: string | null;
  email?: string | null;
  nombreCompleto: string;
  foto?: string | null;
  enabled?: boolean | null;
  roles: Role[];
  estadoKyc:  EstadoKycEnum;
}
