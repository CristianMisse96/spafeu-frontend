import { NivelActividadFisicaEnum } from "@shared/enums/nivel-actividadfisica.enum";

export interface ExerciseCompletionResult {
  subioNivel: boolean;
  ultimoNivel: boolean;
  nivelAnterior: NivelActividadFisicaEnum;
  nivelNuevo: NivelActividadFisicaEnum;
  mensaje: string;
}
