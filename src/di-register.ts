import 'reflect-metadata';

import { container } from 'tsyringe';

import { RecordPatientService as RecordPatientInfrastructureService } from './infrastructure/services/salesforce/patients/record-patient.service';
import { AuthenticationService as AuthenticationInfrastructureService } from './infrastructure/services/salesforce/authentication/authentication.service';
import { RecordPatientService } from './application/services/record-patient.service';
import { AuthenticationService } from './application/services/authentication.service';
import { RecordsSpecialtyService } from './application/services/records-specialty.service';
import { RecordsSpecialtyService as RecordsSpecialtyInfrastructureService } from './infrastructure/services/salesforce/specialties/get-specialties.service';

// services
container.register("RecordPatientServiceInterface", RecordPatientService);
container.register("AuthenticationServiceInterface", AuthenticationService);
container.register("RecordsSpecialtyServiceInterface", RecordsSpecialtyService);

// servicios externos
container.register("AuthenticationServiceInfrastructureInterface", AuthenticationInfrastructureService);
container.register("RecordPatientServiceInfrastructureInterface", RecordPatientInfrastructureService);
container.register("RecordsSpecialtyServiceInfrastructureInterface", RecordsSpecialtyInfrastructureService);

export const diContainer = container;