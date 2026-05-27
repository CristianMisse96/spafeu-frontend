import { NivelActividadFisicaEnum } from "@shared/enums/nivel-actividadfisica.enum";
import { DurationType } from "./duration-type.interface";
import { ProtocolObjective } from "./protocol-objective.interface";

export interface PhysicalActivityProtocol {
  id: number;
  nivelActividadFisica: NivelActividadFisicaEnum;
  name: string;
  description: string;
  suggestedDuration: DurationType;
  objectives: ProtocolObjective[];
}