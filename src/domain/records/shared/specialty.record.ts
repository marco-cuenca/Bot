import { DocumentTypeEnum } from "~/domain/enumerations/document-type.enum";
import { TerritoryRecord } from "./territory.record";

export interface SpecialtyRecord {
  territories: TerritoryRecord[];
  skillName: DocumentTypeEnum;
  skillId: string;
  skillCode: string;
  isPediatrics: string;
  isMundoCI: string;
  isFeatured: string;
}
