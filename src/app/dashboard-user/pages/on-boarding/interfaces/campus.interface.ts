import { AcademicProgram } from "./academic-program.interface";

export interface Campus {
  id: number;
  name: string;
  academicPrograms: AcademicProgram[];
}