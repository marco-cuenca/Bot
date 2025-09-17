import "reflect-metadata";

import { addKeyword, EVENTS } from "@builderbot/bot";
import { MysqlAdapter as Database } from "@builderbot/database-mysql";
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
  async (ctx, { flowDynamic, fallBack, gotoFlow, endFlow, state, globalState }) => {
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

      await state.update({ authentication });

      const [patientFound] = recordPatientResponse.data || [];

      await flowDynamic(`Existes como paciente ${patientFound?.name}`);
    } catch (error: any) {
      return endFlow("En estos momentos estamos teniendo problemas con nuestros servicios, intentelo mas tarde");
    }
  }
);

export const schedulerFlows = [schedulerFlow, schedulerFlowAssignPatient];
