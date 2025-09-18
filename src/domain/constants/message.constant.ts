import { SPECIALTY_NOT_FOUNT_OPTIONS } from "./domain.constant";

export const GENERIC_MESSAGE_API_ERROR = 'En estos momentos estamos teniendo problemas con nuestros servicios, intentelo mas tarde';

export const SPECIALTY_NOT_FOUNT = [
  "En este momento no contamos con la especialidad deseada.",
  "¿Desea reintentar la búsqueda?\n",
  ...SPECIALTY_NOT_FOUNT_OPTIONS.map((row) => `${row.id}: ${row.name}`),
].join("\n");

export const ENTER_SPECIALTY_PROMPT = 'Ingresa la especialidad que deseas reservar';

export const SELECT_APPOINTMENT_MODE_PROMPT = 'Selecciona la modalidad para la cita en $specialtyName';
