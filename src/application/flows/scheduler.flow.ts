import "reflect-metadata";

import { addKeyword, EVENTS } from "@builderbot/bot";
import { MysqlAdapter as Database } from "@builderbot/database-mysql";
// import { MetaProvider as Provider } from "@builderbot/provider-meta";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { WAITING_TIME } from "~/domain/constants/domain.constant";
import { AppointmentEntity } from "~/domain/entities/appointment.entity";
import { reset } from "./idle-custom.flow";
import { AuthenticationServiceInterface } from "~/domain/interfaces/application/authentication-service.interface";
import { RecordPatientServiceInterface } from "~/domain/interfaces/application/record-patient-service.interface";
import { PatientEntity } from "~/domain/entities/patient.entity";
import { unregisteredPatientFlow } from "./unregistered-patient.flow";
import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { diContainer } from "~/di-register";
import { RecordsSpecialtyServiceInterface } from "~/domain/interfaces/application/records-specialty-service.interface";
import { welcomeFlowMenuOptionMessage } from "./welcome.flow";
import {
  ENTER_SPECIALTY_PROMPT,
  GENERIC_MESSAGE_API_ERROR,
  SELECT_APPOINTMENT_MODE_PROMPT,
  SPECIALTY_NOT_FOUNT,
} from "~/domain/constants/message.constant";
import { SpecialtyEntity } from "~/domain/entities/specialty.entity";
import { StringUtil } from "../utils/string.util";
import { ModalityRecord } from "~/domain/records/shared/modality.record";
import { EstablishmentRecord } from "~/domain/records/shared/establishment.record";

export const schedulerFlow = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(async (_, { flowDynamic, state, gotoFlow }) => {
  const appointment = state.get<AppointmentEntity>("appointment");

  await flowDynamic(appointment.openingMessageForScheduling());

  return gotoFlow(schedulerFlowAssignPatient);
});

const schedulerFlowAssignPatient = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(
  { capture: true },
  async (
    ctx,
    { flowDynamic, fallBack, gotoFlow, endFlow, state, globalState }
  ) => {
    reset(ctx, gotoFlow, WAITING_TIME);

    const appointment = state.get<AppointmentEntity>("appointment");

    const message = appointment.selectConfirmation(ctx.body.trim());

    if (message) return fallBack(message);

    const patient = state.get<PatientEntity>("patient");
    const authentication =
      globalState.get<AuthenticationRecord>("authentication");

    try {
      const authenticationService: AuthenticationServiceInterface =
        diContainer.resolve("AuthenticationServiceInterface");
      const recordPatientService: RecordPatientServiceInterface =
        diContainer.resolve("RecordPatientServiceInterface");

      const authenticationResponse = await authenticationService.execute(
        authentication
      );
      const recordPatientResponse = await recordPatientService.execute(
        patient,
        authenticationResponse
      );

      await globalState.update({ authentication: authenticationResponse });

      if (!recordPatientResponse.status.success)
        return gotoFlow(unregisteredPatientFlow);

      const [patientFound] = recordPatientResponse.data || [];

      patient.update({
        fullName: patientFound?.name,
        prmIdentifier: patientFound?.prmIdentifier,
        medicalHistoryNumber: patientFound?.medicalHistoryNumber,
        patientCode: patientFound?.patientCode,
      });

      return gotoFlow(schedulerFlowSelectBookingOptionMessage);
    } catch (error: any) {
      return endFlow(GENERIC_MESSAGE_API_ERROR);
    }
  }
);

const schedulerFlowSelectBookingOptionMessage = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(async (_, { flowDynamic, gotoFlow, state }) => {
  const appointment = state.get<AppointmentEntity>("appointment");

  await flowDynamic(appointment.getBookingOptionsMessage());

  return gotoFlow(schedulerFlowSelectBookingOption);
});

const schedulerFlowSelectBookingOption = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(
  { capture: true },
  async (ctx, { fallBack, gotoFlow, state }) => {
    reset(ctx, gotoFlow, WAITING_TIME);

    const appointment = state.get<AppointmentEntity>("appointment");

    const message = appointment.selectBookingOption(ctx.body.trim());

    if (message) return fallBack(message);

    return gotoFlow(schedulerFlowEnterSpecialtyMessage);
  }
);

const schedulerFlowEnterSpecialtyMessage = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(async (_, { flowDynamic, gotoFlow }) => {
  await flowDynamic(ENTER_SPECIALTY_PROMPT);

  return gotoFlow(schedulerFlowEnterSpecialty);
});

const schedulerFlowEnterSpecialty = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(
  { capture: true },
  async (
    ctx,
    { flowDynamic, gotoFlow, endFlow, state, globalState }
  ) => {
    reset(ctx, gotoFlow, WAITING_TIME);

    const authentication =
      globalState.get<AuthenticationRecord>("authentication");

    try {
      const authenticationService: AuthenticationServiceInterface =
        diContainer.resolve("AuthenticationServiceInterface");
      const recordsSpecialtyService: RecordsSpecialtyServiceInterface =
        diContainer.resolve("RecordsSpecialtyServiceInterface");

      const authenticationResponse = await authenticationService.execute(
        authentication
      );
      const recordsSpecialtyResponse = await recordsSpecialtyService.execute(
        ctx.body.trim(),
        authenticationResponse
      );

      await globalState.update({ authentication: authenticationResponse });

      if (!recordsSpecialtyResponse.status.success) {
        await flowDynamic(SPECIALTY_NOT_FOUNT);

        return gotoFlow(schedulerFlowSpecialtyNotFount);
      }

      const specialtiesFound = recordsSpecialtyResponse.data || [];

      await state.update({
        specialties: specialtiesFound.map((opt, index) =>
          SpecialtyEntity.create(`${index + 1}`, opt)
        ),
      });

      await flowDynamic(
        [
          "Te mostramos la lista que coincide con tu búsqueda\n",
          "Elige la especialidad\n",
          ...specialtiesFound.map(
            (opt, index) => `${index + 1}: ${opt.skillName}`
          ),
          `${specialtiesFound.length + 1}: Volver a buscar`,
        ].join("\n")
      );

      return gotoFlow(schedulerFlowSelectSpecialty);
    } catch (error: any) {
      return endFlow(GENERIC_MESSAGE_API_ERROR);
    }
  }
);

const schedulerFlowSelectSpecialty = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction({ capture: true }, async (ctx, { fallBack, gotoFlow, state }) => {
  reset(ctx, gotoFlow, WAITING_TIME);
  const specialties = state.get<SpecialtyEntity[]>("specialties");
  const appointment = state.get<AppointmentEntity>("appointment");

  if (ctx.body.trim() == `${specialties.length + 1}`)
    return gotoFlow(schedulerFlowEnterSpecialtyMessage);

  const message = appointment.selectSpecialty(ctx.body.trim(), specialties);

  if (message) return fallBack(message);

  return gotoFlow(schedulerFlowSelectModalityMessage);
});

const schedulerFlowSelectModalityMessage = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(async (_, { flowDynamic, gotoFlow, state }) => {
  const appointment = state.get<AppointmentEntity>("appointment");

  const { specialty } = appointment.toPrimitives();

  const modalities = [
    ...new Set(
      specialty?.establishmentByModality?.map(
        (row) => `${StringUtil.capitalizeFirstLetter(row.modality)}`
      )
    ),
  ];

  await state.update({
    modalities: modalities.map((opt, index) => ({
      option: `${index + 1}`,
      name: opt,
    })),
  });

  await flowDynamic(
    [
      `${SELECT_APPOINTMENT_MODE_PROMPT.replace(
        "$specialtyName",
        StringUtil.capitalizeFirstLetter(specialty.name)
      )}\n`,
      ...modalities.map((opt, index) => `${index + 1}: ${opt}`),
    ].join(`\n`)
  );

  return gotoFlow(schedulerFlowSelectModality);
});

const schedulerFlowSelectModality = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction({ capture: true }, async (ctx, { fallBack, gotoFlow, state }) => {
  reset(ctx, gotoFlow, WAITING_TIME);

  const modalities = state.get<ModalityRecord[]>("modalities");
  const appointment = state.get<AppointmentEntity>("appointment");

  const message = appointment.selectModality(ctx.body.trim(), modalities);

  if (message) return fallBack(message);

  return gotoFlow(schedulerFlowSelectEstablishmentMessage);
});

const schedulerFlowSelectEstablishmentMessage = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(async (_, { flowDynamic, gotoFlow, state }) => {
  const appointment = state.get<AppointmentEntity>("appointment");
  const modalities = state.get<ModalityRecord[]>("modalities");

  const { specialty } = appointment.toPrimitives();

  const establishments = [
    ...new Set(
      specialty?.establishmentByModality
        ?.filter((row) => row.modality == appointment.toPrimitives().modality)
        ?.map((row) => ({
          code: row.code,
          name: `${StringUtil.capitalizeWords(row.establishmentName)}`,
        }))
    ),
  ];

  await state.update({
    establishments: establishments.map((opt, index) => ({
      option: `${index + 1}`,
      code: opt.code,
      name: opt.name,
    })),
  });

  const hasTwoModalities = modalities.length == 2;

  await flowDynamic(
    [
      `Elige la Sede\n`,
      ...establishments.map((opt, index) => `${index + 1}: ${opt.name}`),
      ...(hasTwoModalities && [
        `${establishments.length + 1}: Cambiar a cita ${
          modalities.filter(
            (row) =>
              row.name.toLowerCase() != appointment.toPrimitives().modality
          )[0].name
        }`,
      ]),
      `${
        establishments.length + (hasTwoModalities ? 2 : 1)
      }: No deseo continuar`,
    ].join(`\n`)
  );

  return gotoFlow(schedulerFlowSelectEstablishment);
});

const schedulerFlowSelectEstablishment = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction(
  { capture: true },
  async (ctx, { fallBack, gotoFlow, endFlow, state }) => {
    reset(ctx, gotoFlow, WAITING_TIME);

    const establishments = state.get<EstablishmentRecord[]>("establishments");
    const appointment = state.get<AppointmentEntity>("appointment");
    const modalities = state.get<ModalityRecord[]>("modalities");

    const hasTwoModalities = modalities.length == 2;

    if (
      ctx.body.trim() == `${establishments.length + (hasTwoModalities ? 2 : 1)}`
    )
      return endFlow("Nos vemos");

    if (hasTwoModalities && ctx.body.trim() == `${establishments.length + 1}`) {
      const modality = modalities.filter(
        (row) => row.name.toLowerCase() != appointment.toPrimitives().modality
      )[0].name;
      appointment.changeModality(modality);
      return gotoFlow(schedulerFlowSelectEstablishmentMessage);
    }

    const message = appointment.selectEstablishment(
      ctx.body.trim(),
      establishments
    );

    if (message) return fallBack(message);

    // return gotoFlow(schedulerFlowSelectEstablishmentMessage);
    return endFlow("Llegamos bien");
  }
);

const schedulerFlowSpecialtyNotFount = addKeyword<Provider, Database>(
  EVENTS.ACTION
).addAction({ capture: true }, async (ctx, { fallBack, gotoFlow, state }) => {
  reset(ctx, gotoFlow, WAITING_TIME);

  const appointment = state.get<AppointmentEntity>("appointment");

  const message = appointment.selectBookingOption(ctx.body.trim());

  if (message) return fallBack(message);

  const flows = [
    schedulerFlowEnterSpecialtyMessage,
    schedulerFlowSelectBookingOptionMessage,
    welcomeFlowMenuOptionMessage,
  ];

  return gotoFlow(flows[Number(ctx.body.trim()) - 1]);
});

export const schedulerFlows = [
  schedulerFlow,
  schedulerFlowAssignPatient,
  schedulerFlowSelectBookingOptionMessage,
  schedulerFlowSelectBookingOption,
  schedulerFlowEnterSpecialtyMessage,
  schedulerFlowEnterSpecialty,
  schedulerFlowSelectSpecialty,
  schedulerFlowSpecialtyNotFount,
  schedulerFlowSelectModalityMessage,
  schedulerFlowSelectModality,
  schedulerFlowSelectEstablishmentMessage,
  schedulerFlowSelectEstablishment,
];
