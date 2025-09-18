import { DocumentTypeEnum } from "~/domain/enumerations/document-type.enum";

export interface TerritoryRecord {
  workTypeId: string;
  visitType: string;
  territoryName: string;
  territoryId: string;
  territoryCode: string;
  schedulingPolicyId: string;
}
