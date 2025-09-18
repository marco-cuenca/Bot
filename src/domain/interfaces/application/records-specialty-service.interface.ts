import { SpecialtySummaryRecord } from "~/domain/records/specialty-summary.record";
import { AuthenticationRecord } from "~/domain/records/authentication.record";

export abstract class RecordsSpecialtyServiceInterface {
  execute: (
    specialty: string,
    auth: AuthenticationRecord
  ) => Promise<SpecialtySummaryRecord>;
}
