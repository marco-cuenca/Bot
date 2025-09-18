import { StatusRecord } from "./shared/status.record";
import { PatientRecord } from "./shared/patient.record";

export interface RecordPatientRecord {
  status: StatusRecord;
  data?: PatientRecord[]
}
