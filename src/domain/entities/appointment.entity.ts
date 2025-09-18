import { EnumUtil } from "~/application/utils/enum.util";
import {
  BOOKING_OPTIONS,
  GENERIC_ERROR_MESSAGE,
  SYSTEM_OPTIONS,
} from "../constants/domain.constant";
import { ConfirmationEnum } from "../enumerations/confirmation.enum";
import { PatientEntity } from "./patient.entity";
import { SpecialtyEntity } from "./specialty.entity";
import { ModalityRecord } from "../records/shared/modality.record";
import { EstablishmentRecord } from "../records/shared/establishment.record";

export class AppointmentEntity {
  private patient: PatientEntity;
  private specialty: SpecialtyEntity;
  private establishment: EstablishmentRecord;
  private modality: string;
  private medical: any;
  private option: string;

  constructor(patient: PatientEntity, option?: string) {
    this.patient = patient;
    if (option) this.assignOption(option);
  }

  static create(patient: PatientEntity) {
    return new AppointmentEntity(patient);
  }

  changeModality(modality: string) {
    this.modality = modality.toLowerCase();
  }

  selectSpecialty(option: string, specialties: SpecialtyEntity[]) {
    const specialty = specialties.find(
      (row) => row.toPrimitives().option === option.trim()
    );

    if (!specialty && option)
      return [
        GENERIC_ERROR_MESSAGE,
        ...specialties.map(
          (row) => `${row.toPrimitives().option}: ${row.toPrimitives().name}`
        ),
      ].join("\n");

    this.specialty = specialty;
  }

  selectModality(option: string, modalities: ModalityRecord[]) {
    const modality = modalities.find(
      (row) => row.option === option.trim()
    );

    if (!modality && option)
      return [
        GENERIC_ERROR_MESSAGE,
        ...modalities.map(
          (row) => `${row.option}: ${row.name}`
        ),
      ].join("\n");

    this.modality = modality.name.toLowerCase();
  }

  selectEstablishment(option: string, establishments: EstablishmentRecord[]) {
    const establishment = establishments.find(
      (row) => row.option === option.trim()
    );

    if (!establishments && option)
      return [
        GENERIC_ERROR_MESSAGE,
        ...establishments.map(
          (row) => `${row.option}: ${row.name}`
        ),
      ].join("\n");

    this.establishment = establishment;
  }

  getBookingOptionsMessage() {
    return [
      `${
        this.patient.toPrimitives().fullName
      } ¿Cómo quieres reservar tu cita?\n`,
      ...BOOKING_OPTIONS.map((row) => `${row.id}: ${row.name}`),
    ].join("\n");
  }

  selectBookingOption(selectedOption: string) {
    const option = BOOKING_OPTIONS.find(
      (row) => row.id === selectedOption.trim()
    );

    if (!option)
      return [
        GENERIC_ERROR_MESSAGE,
        ...BOOKING_OPTIONS.map((row) => `${row.id}: ${row.name}`),
      ].join("\n");

    this.option = option.id;
  }

  showOptionsMessage() {
    return [
      `Gracias por la información ${this.patient.toPrimitives().name}`,
      "¿Con cuál de estas opciones te puedo ayudar hoy? \n",
      ...SYSTEM_OPTIONS.map((row) => `${row.id}: ${row.name}`),
    ].join("\n");
  }

  openingMessageForScheduling() {
    return [
      "En caso necesites una cita para el programa Cuídate, Chequeo Preventivo, Sonrisa Total o una especialidad que no encuentres en esta lista, por favor comunícate al 619-6161. \n",
      "Cuéntanos. ¿La reserva es para ti? \n",
      `${ConfirmationEnum.YES}: Sí`,
      `${ConfirmationEnum.NO}: No`,
    ].join("\n");
  }

  selectConfirmation(confirmation: string) {
    const confirmationEnum = EnumUtil.convertToEnumByValue(
      ConfirmationEnum,
      confirmation
    );

    if (![ConfirmationEnum.YES, ConfirmationEnum.NO].includes(confirmationEnum))
      return [
        GENERIC_ERROR_MESSAGE,
        `${ConfirmationEnum.YES}: Sí`,
        `${ConfirmationEnum.NO}: No`,
      ].join("\n");
  }

  assignOption(selectedOption: string) {
    const option = SYSTEM_OPTIONS.find(
      (row) => row.id === selectedOption.trim()
    );

    if (!option)
      return [
        GENERIC_ERROR_MESSAGE,
        ...SYSTEM_OPTIONS.map((row) => `${row.id}: ${row.name}`),
      ].join("\n");

    this.option = option.id;
  }

  toPrimitives() {
    return {
      option: this.option,
      modality: this.modality,
      establishment: this.establishment,
      specialty: this.specialty?.toPrimitives(),
      patient: this.patient?.toPrimitives(),
    };
  }
}
