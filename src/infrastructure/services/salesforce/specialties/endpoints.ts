// import { BASE_SALESFORCE } from "../../../shared/domain/constants/domain.constant";
// import { RecordsSpecialtiesPayload } from "../domain/payloads/records-specialties.payload";
// const base = BASE_SALESFORCE;

// export const Endpoints = {
//   getSpecialties: (payload: RecordsSpecialtiesPayload, token: string): any => ({
//     url: `/services/apexrest/portalGetEspecialidades`,
//     method: "post",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//     },
//     data: {
//       Visible: payload.is_visible,
//       CodSede: payload.establishment_code,
//       TipoVisita: payload.modality,
//     },
//   }),
// };