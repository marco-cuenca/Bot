import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { RecordsSpecialtyPayload } from "~/domain/payloads/records-specialty.payload";
import { SpecialtySummaryRecord } from "~/domain/records/specialty-summary.record";

export abstract class RecordsSpecialtyServiceInterface {
  execute: (
    payload: RecordsSpecialtyPayload,
    auth: AuthenticationRecord
  ) => Promise<SpecialtySummaryRecord>;
}
