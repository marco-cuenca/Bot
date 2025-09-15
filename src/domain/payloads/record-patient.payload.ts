import { DocumentTypeEnum } from "../enumerations/document-type.enum";

export class RecordPatientPayload {
  has_document_type: boolean;
  document_type?: DocumentTypeEnum;
  document_number?: string;
  salesforce_identifier?: string;
  show_dependents: boolean;
}
