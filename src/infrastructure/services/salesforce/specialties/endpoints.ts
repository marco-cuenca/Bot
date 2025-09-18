import { CHANNEL } from "~/domain/constants/domain.constant";
import { RecordsSpecialtyPayload } from "~/domain/payloads/records-specialty.payload";

export const Endpoints = {
  getSpecialties: (payload: RecordsSpecialtyPayload, token: string): any => ({
    url: `/services/apexrest/CIServices/skills`,
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      channel: CHANNEL,
      searchType: payload.searchType,
      data: {
        valueType: payload.valueType,
        searchValue: payload.searchValue,
        ...(payload.additionalFilters && {
          additionalFilters: {
            ...(payload.additionalFilters.visitType && {
              visitType: payload.additionalFilters.visitType,
            }),
            ...(payload.additionalFilters.serviceType && {
              serviceType: payload.additionalFilters.serviceType,
            }),
            ...(payload.additionalFilters.isMundoCI != undefined &&
              payload.additionalFilters.isMundoCI != null && {
                isMundoCI: payload.additionalFilters.isMundoCI,
              }),
          },
        }),
      },
    },
  }),
};
