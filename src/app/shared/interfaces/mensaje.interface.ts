import { SeverityEnum } from "@shared/enums/severity.enum";

export interface Mensaje {
  severity?: SeverityEnum;
  summary?: string;
  detail?: string;
}