import { AxiosResponse } from "axios";

import { Endpoints } from "./endpoints";
import { HttpClient } from "~/infrastructure/clients/http.client";
import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { RecordPatientRecord } from "~/domain/records/record-patient.record";
import { RecordPatientPayload } from "~/domain/payloads/record-patient.payload";
import { RecordPatientServiceInterface } from "~/domain/interfaces/infrastructure/record-patient-service.interface";
import { BASE_SALESFORCE } from "~/domain/constants/domain.constant";

export class RecordPatientService implements RecordPatientServiceInterface {
  async execute(payload: RecordPatientPayload, auth: AuthenticationRecord) {
    const { getPatient } = Endpoints;

    try {
      let result: AxiosResponse = await HttpClient(
        BASE_SALESFORCE.url_base
      ).request(getPatient(payload, auth.access_token));

      return result?.data as RecordPatientRecord;
    } catch (error) {
      return error.response.data as RecordPatientRecord;
    }
  }
}
