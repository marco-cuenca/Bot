import { RecordPatientPayload } from "~/domain/payloads/record-patient.payload";
import { RecordPatientRecord } from "../../records/record-patient.record";
import { AuthenticationRecord } from "~/domain/records/authentication.record";

export abstract class RecordPatientServiceInterface {
  execute: (
    payload: RecordPatientPayload,
    auth: AuthenticationRecord
  ) => Promise<RecordPatientRecord>;
}
