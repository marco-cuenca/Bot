import { AxiosResponse } from "axios";
import { RecordsSpecialtyServiceInterface } from "~/domain/interfaces/infrastructure/records-specialty-service.interface";
import { SpecialtySummaryRecord } from "~/domain/records/specialty-summary.record";
import { Endpoints } from "./endpoints";
import { RecordsSpecialtyPayload } from "~/domain/payloads/records-specialty.payload";
import { BASE_SALESFORCE } from "~/domain/constants/domain.constant";
import { HttpClient } from "~/infrastructure/clients/http.client";
import { AuthenticationRecord } from "~/domain/records/authentication.record";

export class RecordsSpecialtyService
  implements RecordsSpecialtyServiceInterface
{
  async execute(payload: RecordsSpecialtyPayload, token: AuthenticationRecord) {
    const { getSpecialties } = Endpoints;

    try {
      let result: AxiosResponse = await HttpClient(
        BASE_SALESFORCE.url_base
      ).request(getSpecialties(payload, token.access_token));

      return result?.data as SpecialtySummaryRecord;
    } catch (error) {
      return error.response.data as SpecialtySummaryRecord;
    }
  }
}
