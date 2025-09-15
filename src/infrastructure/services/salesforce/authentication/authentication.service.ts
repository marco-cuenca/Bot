import { AxiosResponse } from "axios";

import { Endpoints } from "./endpoints";
import { HttpClient } from "~/infrastructure/clients/http.client";
import { BASE_SALESFORCE } from "~/domain/constants/domain.constant";
import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { AuthenticationServiceInterface } from "~/domain/interfaces/infrastructure/authentication-service.interface";

export class AuthenticationService implements AuthenticationServiceInterface {
  async execute() {
    const { authenticationSystem } = Endpoints;

    let result: AxiosResponse = await HttpClient(
      BASE_SALESFORCE.url_base
    ).request(authenticationSystem());

    return result?.data as AuthenticationRecord;
  }
}
