import { Exercise } from "./exercise.interface";

export interface ExerciseGroupedByActivityType {
    activityType: string;
    exercises: Exercise[];
}