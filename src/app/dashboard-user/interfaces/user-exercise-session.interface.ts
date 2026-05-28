export interface UserExerciseSession {

    id: number;

    exerciseId: number;

    exerciseName: string;

    exercisePhoto: string | null;

    activityType: string;

    fechaInicio: string;

    fechaFin: string | null;

    minutosRealizados: number;

    completado: boolean;

}