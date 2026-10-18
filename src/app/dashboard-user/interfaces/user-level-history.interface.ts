import { NivelActividadFisicaEnum } from "@shared/enums/nivel-actividadfisica.enum";

export interface UserLevelHistory {
  id: number;
  userId: number;
  nivelAnterior: NivelActividadFisicaEnum | null;
  nivelNuevo: NivelActividadFisicaEnum;
  fechaCambio: string;
  observacion: string;
}
