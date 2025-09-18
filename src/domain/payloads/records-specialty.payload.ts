import { ModalityEnum } from "../enumerations/modality.enum";
import { SearchTypeEnum } from "../enumerations/search-types.enum";
import { ServiceTypeEnum } from "../enumerations/service-types.enum";
import { ValueTypeEnum } from "../enumerations/value-types.enum";

export class RecordsSpecialtyPayload {
  searchType: SearchTypeEnum;
  valueType: ValueTypeEnum;
  searchValue: string;
  additionalFilters?: {
    visitType?: ModalityEnum,
    serviceType?: ServiceTypeEnum,
    isMundoCI?: Boolean,
  }
}
