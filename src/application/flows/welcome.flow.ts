import { addKeyword, EVENTS } from "@builderbot/bot";
import { MysqlAdapter as Database } from "@builderbot/database-mysql";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { schedulerFlow } from "./scheduler.flow";
import { WAITING_TIME } from "~/domain/constants/domain.constant";
import { PatientEntity } from "~/domain/entities/patient.entity";
import { reset, start } from "./idle-custom.flow";
import { AppointmentEntity } from "~/domain/entities/appointment.entity";

export const welcomeFlow = addKeyword<Provider, Database>(EVENTS.WELCOME)
  .addAction(async (ctx, { gotoFlow }) => start(ctx, gotoFlow, WAITING_TIME))
  .addAnswer(
    [
      "Hola soy Claudia, tu asistente virtual. Estoy aquí para ayudarte a gestionar tus citas de manera rápida.",
      "Para conocernos mejor cuéntanos",
      "¿Cuál es tu nombre?",
    ].join("\n"),
    { capture: true },
    async (ctx, { state, flowDynamic, gotoFlow }) => {
      reset(ctx, gotoFlow, WAITING_TIME);

      const patient = PatientEntity.create(ctx.body);

      await state.update({ patient });

      // await flowDynamic(patient.messageToRequestDocumentType());
    }
  )
  .addAction(async (ctx, { flowDynamic }) => {
    const patient = PatientEntity.create(ctx.body);

    await flowDynamic(patient.messageToRequestDocumentType());
  })
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, fallBack, gotoFlow, state }) => {
      reset(ctx, gotoFlow, WAITING_TIME);

      const patient = state.get<PatientEntity>("patient");

      const message = patient.assignDocumentType(ctx.body.trim());

      if (message) return fallBack(message);

      // await state.update({ patient });

      await flowDynamic(patient.messageToRequestDocumentNumber());
    }
  )
  .addAction(
    { capture: true },
    async (ctx, { flowDynamic, fallBack, gotoFlow, state }) => {
      reset(ctx, gotoFlow, WAITING_TIME);

      const patient = state.get<PatientEntity>("patient");

      const message = patient.assignDocumentNumber(ctx.body.trim());

      if (message) return fallBack(message);

      // await state.update({ patient });

      const appointment = AppointmentEntity.create(patient);

      await state.update({ appointment });

      await flowDynamic(appointment.showOptionsMessage());
    }
  )
  .addAction({ capture: true }, async (ctx, { state, gotoFlow, fallBack }) => {
    reset(ctx, gotoFlow, WAITING_TIME);

    const appointment = state.get<AppointmentEntity>("appointment");

    const message = appointment.assignOption(ctx.body.trim());

    if (message) return fallBack(message);

    const flows = [
      schedulerFlow,
      schedulerFlow,
      schedulerFlow,
      schedulerFlow,
      schedulerFlow,
    ];

    return gotoFlow(flows[Number(ctx.body.trim()) - 1]);
  });
