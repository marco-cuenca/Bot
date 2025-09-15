export class EnumUtil {
  static convertToEnumByValue<T extends object>(
    enumClass: T,
    value: string
  ): T[keyof T] | undefined {
    const keys = Object.keys(enumClass).filter((k) => isNaN(Number(k)));

    for (const key of keys) {
      if (enumClass[key as keyof T] === value) {
        return enumClass[key as keyof T];
      }
    }

    return undefined;
  }
}
