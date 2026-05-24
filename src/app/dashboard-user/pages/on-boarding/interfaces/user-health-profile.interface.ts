import { SexEnum } from "@shared/enums/sex.enum";
import { UserAnswer } from "./user-answer.interface";

export interface UserHealthProfile {
  fullName: string;
  campusId: number;
  programId: number;
  semester: number;
  birthDate: Date;
  sex: SexEnum;
  weightKg: number;
  heightM: number;
  answers: UserAnswer[];
}