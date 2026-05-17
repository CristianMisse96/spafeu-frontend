import { Option } from "./option.interface";

export interface Question {
  id: number;
  text: string;
  options: Option[];
}