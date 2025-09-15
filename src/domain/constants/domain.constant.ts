import * as dotenv from 'dotenv';

dotenv.config();

import { DocumentTypeEnum } from "../enumerations/document-type.enum";
import { BaseSalesforceApiRecord } from "../records/base-salesforce-api.record";

export const CHANNEL = 'PortalDocte';

export const BASE_SALESFORCE: BaseSalesforceApiRecord = JSON.parse(process.env.CONFIG_BASE_SALESFORCE!);

export const WAITING_TIME = 60000;

export const DOCUMENT_TYPE = {
    DNI: {
        id: DocumentTypeEnum.DNI,
        option: '1',
        name: 'DNI',
        length: 8,
    },
    CE: {
        id: DocumentTypeEnum.CE,
        option: '2',
        name: 'Carnet de extranjería',
        length: 7,
    },
    PASSPORT: {
        id: DocumentTypeEnum.PASSPORT,
        option: '3',
        name: 'Pasaporte',
        length: 8,
    },
};

export const SYSTEM_OPTIONS = [
    {
        id: '1',
        name: 'Reservar cita'
    },
    {
        id: '2',
        name: 'Cambiar cita'
    },
    {
        id: '3',
        name: 'Anular cita'
    },
    {
        id: '4',
        name: 'Pagar cita'
    },
    {
        id: '5',
        name: 'Preguntas Frecuentes'
    }
];