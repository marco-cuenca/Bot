import { ContactTypeEnum } from "~/domain/enumerations/contact-type.enum";

export interface ContactRecord {
  type: ContactTypeEnum;
  value: string;
}
