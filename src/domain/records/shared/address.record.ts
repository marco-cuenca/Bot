import { AddressTypeEnum } from "~/domain/enumerations/address-type.enum";
import { CountryTypeEnum } from "~/domain/enumerations/country-type.enum";
import { DepartmentTypeEnum } from "~/domain/enumerations/department-type.enum";

export interface AddressRecord {
  type: AddressTypeEnum;
  street: string;
  district: string;
  city: string;
  state: DepartmentTypeEnum;
  country: CountryTypeEnum;
  reference?: string;
  postalCode?: string;
}
