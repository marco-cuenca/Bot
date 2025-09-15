import { inject, injectable } from "tsyringe";

import { RecordPatientServiceInterface } from "~/domain/interfaces/application/record-patient-service.interface";
import { RecordPatientServiceInterface as RecordPatientServiceInfrastructureInterface } from "~/domain/interfaces/infrastructure/record-patient-service.interface";
import { PatientEntity } from "~/domain/entities/patient.entity";
import { AuthenticationRecord } from "~/domain/records/authentication.record";

@injectable()
export class RecordPatientService implements RecordPatientServiceInterface {
  constructor(
    @inject("RecordPatientServiceInfrastructureInterface")
    private readonly recordPatientService: RecordPatientServiceInfrastructureInterface
  ) {}

  public async execute(
    patientEntity: PatientEntity,
    auth: AuthenticationRecord
  ) {
    const patient = patientEntity.toPrimitives();

    return await this.recordPatientService.execute(
      {
        has_document_type: true,
        document_type: patient.documentType.id,
        document_number: patient.documentNumber,
        show_dependents: false,
      },
      auth
    );
  }
}
