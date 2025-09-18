import { StatusRecord } from "./shared/status.record";
import { SpecialtyRecord } from "./shared/specialty.record";

export interface SpecialtySummaryRecord {
  status: StatusRecord;
  data?: SpecialtyRecord[]
}
