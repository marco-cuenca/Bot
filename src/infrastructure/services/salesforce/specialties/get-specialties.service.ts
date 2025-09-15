// import { Injectable } from "@nestjs/common";

// import { AxiosResponse } from "axios";
// import { BASE_SALESFORCE } from "../../../../shared/domain/constants/domain.constant";
// import { HttpClient } from "../../../../shared/infrastructure/http-client";
// import { Endpoints } from "../endpoints";
// import { RecordsSpecialtiesPayload } from "../../domain/payloads/records-specialties.payload";
// import { RecordsSpecialtiesResult } from "../../domain/results/records-specialties.result";
// import { GetSpecialtiesError } from "../../domain/errors/get-specialties-salesforce.error";
// import { RecordsSpecialtiesServiceInterface } from "../../application/interfaces/infrastructure/records-specialties-service.interface";
// import { GetSpecialtiesRecord } from "../../domain/records/get-specialties.record";

// @Injectable()
// export class GetSpecialtiesService implements RecordsSpecialtiesServiceInterface {
//   async execute (payload: RecordsSpecialtiesPayload, token: string) {
//     const { getSpecialties } = Endpoints;

//     let result: AxiosResponse = await HttpClient(BASE_SALESFORCE.url_base)
//                                         .request(getSpecialties(payload, token));

//     if (result?.data?.CodRespuesta != '0') GetSpecialtiesError.launch(result?.data?.DescRespuesta); 

//     return RecordsSpecialtiesResult.of(result?.data?.Especialidades as GetSpecialtiesRecord[]);
//   }
// }
