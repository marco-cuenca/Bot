import { EnumUtil } from "~/application/utils/enum.util";
import { SYSTEM_OPTIONS } from "../constants/domain.constant";
import { ConfirmationEnum } from "../enumerations/confirmation.enum";
import { PatientEntity } from "./patient.entity";

export class AppointmentEntity {
  private patient: PatientEntity;
  private option: string;

  constructor(patient: PatientEntity, option?: string) {
    this.patient = patient;
    if (option) this.assignOption(option);
  }

  static create(patient: PatientEntity) {
    return new AppointmentEntity(patient);
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
        "No hemos logrado entender la información. Indícanos nuevamente por favor \n.",
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
        "No hemos logrado entender la información. Indícanos nuevamente por favor \n.",
        ...SYSTEM_OPTIONS.map((row) => `${row.id}: ${row.name}`),
      ].join("\n");

    this.option = option.id;
  }

  toPrimitives() {
    return {
      option: this.option,
      patient: this.patient.toPrimitives(),
    };
  }
}
