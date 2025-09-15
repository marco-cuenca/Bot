import { RecordPatientRecord } from "../../records/record-patient.record";
import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { PatientEntity } from "~/domain/entities/patient.entity";

export abstract class RecordPatientServiceInterface {
  execute: (
    PatientEntity: PatientEntity,
    auth: AuthenticationRecord
  ) => Promise<RecordPatientRecord>;
}
