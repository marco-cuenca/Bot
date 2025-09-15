import { DOCUMENT_TYPE } from "../constants/domain.constant";
import { DocumentTypeEnum } from "../enumerations/document-type.enum";

export class PatientEntity {
  private name: string;
  private documentNumber: string;
  private documentType: {
    id: DocumentTypeEnum;
    option: string;
    name: string;
    length: number;
  };

  constructor(name: string, documentType?: string, documentNumber?: string) {
    this.name = name;
    if (documentType) this.assignDocumentType(documentType);
    if (documentNumber) this.assignDocumentNumber(documentNumber);
  }

  static create(name: string) {
    return new PatientEntity(name.trim());
  }

  messageToRequestDocumentType() {
    return [
      "Indícanos el tipo de documento de identidad \n",
      ...Object.values(DOCUMENT_TYPE).map((row) => `${row.option}: ${row.name}`),
    ].join("\n");
  }

  messageToRequestDocumentNumber() {
    return `Ingrese el numero de ${this.documentType?.name}`;
  }

  assignDocumentType(newDocumentType: string) {
    const documentType = Object.values(DOCUMENT_TYPE).find(
      (row) => row.option === newDocumentType.trim()
    );

    if (!documentType)
      return [
        "No hemos logrado entender la información. Indícanos nuevamente por favor \n",
        ...Object.values(DOCUMENT_TYPE).map((row) => `${row.option}: ${row.name}`),
      ].join("\n");

    this.documentType = documentType;
  }

  isNumericString(value: string): boolean {
    return !isNaN(Number(value));
  }

  private validateDocumentNumber(value: string): string | null {
    if (!this.documentType) {
      return "Debe asignar primero un tipo de documento";
    }

    const trimmed = value.trim();
    const typeConfig = Object.values(DOCUMENT_TYPE).find(
      (row) => row.id === this.documentType.id
    );

    if (!typeConfig) return "Tipo de documento no válido";

    const validators: Record<string, () => string | null> = {
      [DOCUMENT_TYPE.DNI.id]: () => {
        if (
          trimmed.length !== typeConfig.length ||
          !this.isNumericString(trimmed)
        ) {
          return `Ingrese un número de DNI válido. Debe tener exactamente ${typeConfig.length} dígitos numéricos`;
        }
        return null;
      },
      default: () => {
        if (trimmed.length < typeConfig.length) {
          return `Ingrese un número de ${typeConfig.name} válido. Debe contener al menos ${typeConfig.length} caracteres`;
        }
        return null;
      },
    };

    const validator = validators[this.documentType.id] ?? validators.default;
    return validator();
  }

  assignDocumentNumber(newDocumentNumber: string) {
    const error = this.validateDocumentNumber(newDocumentNumber);
    if (error) return error;

    this.documentNumber = newDocumentNumber.trim();
  }

  toPrimitives() {
    return {
      name: this.name,
      documentNumber: this.documentNumber,
      documentType: this.documentType,
    };
  }
}
