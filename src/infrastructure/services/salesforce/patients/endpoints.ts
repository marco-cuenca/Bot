// import { CreatePatientPayload } from '../domain/payloads/create-patient.payload';
// import { UpdatePatientPayload } from '../domain/payloads/update-patient.payload';
import { CHANNEL } from '~/domain/constants/domain.constant';
import { TaskTypeEnum } from '~/domain/enumerations/task-type.enum';
import { RecordPatientPayload } from '~/domain/payloads/record-patient.payload';
import { CountryTypeEnum } from '~/domain/enumerations/country-type.enum';
import { SegmentTypeEnum } from '~/domain/enumerations/segment-type.enum';
import { MaritalStatusEnum } from '~/domain/enumerations/marital-status.enum';
import { SexTypeEnum } from '~/domain/enumerations/sex-type.enum';

export const Endpoints = {
  getPatient: (payload: RecordPatientPayload, token: string): any => ({
    url: `/services/apexrest/CIServices/patients`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      channel: CHANNEL,
      searchType: 'identityDocument',
      data: {
        ...(payload.document_type && { documentType: payload.document_type }),
        searchvalue: payload.has_document_type
          ? payload.document_number
          : payload.salesforce_identifier,
        showDependents: payload.show_dependents,
      },
    },
  }),
//   createPatient: (payload: CreatePatientPayload, token: string): any => ({
//     url: `/services/apexrest/CIServices/patients/upsert`,
//     method: 'post',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data: {
//       channel: CHANNEL,
//       task: TaskTypeEnum.CREATE,
//       data: {
//         documentType: payload.document_type,
//         documentNumber: payload.document_number,
//         lastName: payload.middle_name,
//         suffix: payload.last_name,
//         name: payload.name,
//         personBirthdate: payload.birth_date,
//         sex: payload.sex || SexTypeEnum.UNDEFINED,
//         maritalStatus: payload.marital_status || MaritalStatusEnum.UNAVAILABLE,
//         segment: payload.segment_type || SegmentTypeEnum.DOES_NOT_SPECIFY,
//         ...(payload.contact && {
//           contact: payload.contact.map((contact) => ({
//             type: contact.type,
//             value: contact.value,
//           })),
//         }),
//         ...(payload.address && {
//           address: payload.address.map((address) => ({
//             type: address.type,
//             street: address.street,
//             ...(address.district && { district: address.district }),
//             ...(address.province && { city: address.province }),
//             ...(address.department_id && { state: address.department_id }),
//             country: address.country || CountryTypeEnum.DOES_NOT_SPECIFY,
//             ...(address.reference && { reference: address.reference }),
//             ...(address.postal_code && { postal_code: address.postal_code }),
//           })),
//         }),
//         ...(payload.policies && {
//           informedConsent: {
//             termsAndConditions: payload.policies.accept_terms_and_conditions,
//             personalDataSharing: payload.policies.accept_personal_data_sharing,
//             sendPromotion: payload.policies.accept_send_promotion,
//           },
//         }),
//       },
//     },
//   }),
//   updatePatient: (payload: UpdatePatientPayload, token: string): any => ({
//     url: `/services/apexrest/CIServices/patients/upsert`,
//     method: 'post',
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     data: {
//       channel: CHANNEL,
//       task: TaskTypeEnum.UPDATE,
//       data: {
//         filters: {
//           searchType: 'identityDocument',
//           documentType: payload.document_type,
//           searchValue: payload.document_number,
//         },
//         attributes: {
//           documentType: payload.document_type,
//           documentNumber: payload.document_number,
//           ...(payload.middle_name && { lastName: payload.middle_name }),
//           ...(payload.last_name && { suffix: payload.last_name }),
//           ...(payload.name && { name: payload.name }),
//           ...(payload.birth_date && { personBirthdate: payload.birth_date }),
//           ...(payload.sex && { sex: payload.sex }),
//           ...(payload.marital_status && {
//             maritalStatus: payload.marital_status,
//           }),
//           ...(payload.segment_type && { segment: payload.segment_type }),
//           ...(payload.contact && {
//             contact: payload.contact.map((contact) => ({
//               type: contact.type,
//               value: contact.value,
//             })),
//           }),
//           ...(payload.address && {
//             address: payload.address.map((address) => ({
//               type: address.type,
//               ...(address.street && { street: address.street }),
//               ...(address.district && { district: address.district }),
//               ...(address.province && { city: address.province }),
//               ...(address.department_id && { state: address.department_id }),
//               ...(address.country && { country: address.country }),
//               ...(address.reference && { reference: address.reference }),
//               ...(address.postal_code && {
//                 postal_code: address.postal_code,
//               }),
//             })),
//           }),
//           ...(payload.policies && {
//             informedConsent: {
//               ...(payload.policies.accept_terms_and_conditions != null &&
//                 payload.policies.accept_terms_and_conditions != undefined && {
//                   termsAndConditions:
//                     payload.policies.accept_terms_and_conditions,
//                 }),
//               ...(payload.policies.accept_personal_data_sharing != null &&
//                 payload.policies.accept_personal_data_sharing !=
//                   undefined && {
//                   personalDataSharing:
//                     payload.policies.accept_personal_data_sharing,
//                 }),
//               ...(payload.policies.accept_send_promotion != null &&
//                 payload.policies.accept_send_promotion != undefined && {
//                   sendPromotion: payload.policies.accept_send_promotion,
//                 }),
//             },
//           }),
//         },
//       },
//     },
//   }),
};
