import { DocumentTypeEnum } from "~/domain/enumerations/document-type.enum";
import { AddressRecord } from "./address.record";
import { ContactRecord } from "./contact.record";
import { SexTypeEnum } from "~/domain/enumerations/sex-type.enum";
import { MaritalStatusEnum } from "~/domain/enumerations/marital-status.enum";
import { SegmentTypeEnum } from "~/domain/enumerations/segment-type.enum";

export interface PatientRecord {
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
    sendPromotion: boolean;
  };
}
