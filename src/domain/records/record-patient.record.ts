import { MaritalStatusEnum } from "../enumerations/marital-status.enum";
import { StatusRecord } from "./shared/status.record";
import { AddressRecord } from "./shared/address.record";
import { ContactRecord } from "./shared/contact.record";
import { SexTypeEnum } from "../enumerations/sex-type.enum";
import { SegmentTypeEnum } from "../enumerations/segment-type.enum";
import { DocumentTypeEnum } from "../enumerations/document-type.enum";

export interface RecordPatientRecord {
  status: StatusRecord;
  data?: {
    prmIdentifier: string;
    documentType: DocumentTypeEnum;
    documentNumber: string;
    lastName: string;
    motherLastName: string;
    name: string;

    medicalHistoryNumber: string;
    // medicalHistory: MedicalHistoryRecord[];
    patientCode: string;
    // patientCode: PatientCodeRecord[];
    
    contact: ContactRecord[];
    address: AddressRecord[];
    birthdate: string;
    sex: SexTypeEnum;
    maritalStatus: MaritalStatusEnum;
    segment: SegmentTypeEnum;
    underage: boolean;
    informedConsent: {
      termsAndConditions: boolean;
      sendPromotion: boolean
    } 
  }[]
}
