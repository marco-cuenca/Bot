import { inject, injectable } from "tsyringe";

import { RecordsSpecialtyServiceInterface } from "~/domain/interfaces/application/records-specialty-service.interface";
import { RecordsSpecialtyServiceInterface as RecordsSpecialtyServiceInfrastructureInterface } from "~/domain/interfaces/infrastructure/records-specialty-service.interface";
import { AuthenticationRecord } from "~/domain/records/authentication.record";
import { SearchTypeEnum } from "~/domain/enumerations/search-types.enum";
import { ValueTypeEnum } from "~/domain/enumerations/value-types.enum";

@injectable()
export class RecordsSpecialtyService implements RecordsSpecialtyServiceInterface {
  constructor(
    @inject("RecordsSpecialtyServiceInfrastructureInterface")
    private readonly recordsSpecialtyService: RecordsSpecialtyServiceInfrastructureInterface
  ) {}

  public async execute(
    specialty: string,
    auth: AuthenticationRecord
  ) {
    return await this.recordsSpecialtyService.execute(
      {
        searchType: SearchTypeEnum.SKILL,
        valueType: ValueTypeEnum.NAME,
        searchValue: specialty,
      },
      auth
    );
  }
}
