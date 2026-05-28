import { UserExerciseSession } from "./user-exercise-session.interface";

export interface UserProgressDashboard {

    totalSesiones: number;

    totalMinutos: number;

    ultimaActividad: string;

    sesionesRecientes: UserExerciseSession[];

}