import { EnumUtil } from "~/application/utils/enum.util";
import { ModalityEnum } from "../enumerations/modality.enum";
import { SpecialtyRecord } from "../records/shared/specialty.record";

export class SpecialtyEntity {
  private option: string;
  private code: string;
  private name: string;
  private establishmentByModality: {
    modality: ModalityEnum;
    establishmentName: string;
    code: string;
  }[];

  constructor(
    option: string,
    code: string,
    name: string,
    establishmentByModality: {
      modality: ModalityEnum;
      establishmentName: string;
      code: string;
    }[]
  ) {
    this.option = option;
    this.code = code;
    this.name = name;
    this.establishmentByModality = establishmentByModality;
  }

  static create(option: string, specialty: SpecialtyRecord) {
    const establishmentByModality = specialty.territories?.map(
      (row, index) => ({
        modality: EnumUtil.convertToEnumByValue(ModalityEnum, row.visitType),
        establishmentName: row.territoryName,
        code: row.territoryCode,
      })
    );

    return new SpecialtyEntity(
      option,
      specialty.skillCode,
      specialty.skillName,
      establishmentByModality
    );
  }

  toPrimitives() {
    return {
      option: this.option,
      code: this.code,
      name: this.name,
      establishmentByModality: this.establishmentByModality,
    };
  }
}
