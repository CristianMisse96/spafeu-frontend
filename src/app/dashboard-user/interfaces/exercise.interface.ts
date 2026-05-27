import { ActivityType } from "./activity-type.interface";
import { DurationType } from "./duration-type.interface";
import { IntensityType } from "./intensity-type.interface";

export interface Exercise {
    id: number;
    name: string;
    descripcionEjercicio: string;
    tipoActividadFisica: ActivityType;
    tipoIntensidad: IntensityType;
    duracion: DurationType;
    foto: string;
}