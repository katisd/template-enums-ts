import { defaultNumberEnums, defaultStringEnums } from "./default";

export type GenericBaseObject<T> = {
  value: T;
  en: string;
  th: string;
};

type EnumsBaseRecord =
  | Record<string, GenericBaseObject<number>>
  | Record<string, GenericBaseObject<string>>;

export type ValueOfBaseEnums<T extends EnumsBaseRecord> = T[keyof T]["value"];

type EnumsObject<T extends EnumsBaseRecord> = T[keyof T]["value"] extends string
  ? GenericBaseObject<string>
  : GenericBaseObject<number>;

export class Enums<T extends EnumsBaseRecord> {
  private readonly enumsObj: T;
  private readonly enumDefaultValue;

  /**
   * @summary Enum object
   * @example
   * Gender.enums.Female // 2
   */
  readonly enums: Record<keyof T, T[keyof T]["value"]>;

  constructor(enumsObj: T, defaultValue?: EnumsObject<T>) {
    this.enumsObj = enumsObj;
    this.enumDefaultValue =
      defaultValue ??
      typeof enumsObj[Object.keys(enumsObj)[0]].value === "number"
        ? defaultNumberEnums
        : defaultStringEnums;
    this.enums = Object.keys(enumsObj).reduce((acc, key: keyof T) => {
      acc[key] = enumsObj[key].value;
      return acc;
    }, {} as Record<keyof T, T[keyof T]["value"]>);
  }

  /**
   * @summary Get list of enum object and enum key
   * @example
   * Gender.entries // [{key: "Male", value : 1, th: "ชาย", en: "male"},{key:"Female", value: 2, th: "หญิง" en: "female"} ...]
   */
  get entries(): ({
    key: keyof T;
  } & EnumsObject<T>)[] {
    return Object.entries(this.enumsObj).map(([key, value]) => ({
      key,
      ...value,
    }));
  }
  // [{values, th, en}] => [{key, value, en, th}]

  /**
   * @summary Get enum object from enum code or enum value
   * @param val - enum code or enum value
   * @param defaultValue - default object to return if the enum code or enum value is not found
   * @returns enum object {value: number; th: string; en: string}
   * @example
   * Gender.getEnumValue(1) // {value:1, th:"ชาย", en:"male"}
   * Gender.getEnumValue("Male") // {value:1, th:"ชาย", en:"male"}
   * Gender.getEnumValue("M",{value:0 , th:"ไม่ระบุ", en:"not specified"}) // {value:0, th:"ไม่ระบุ", en:"not specified"}
   */
  getEnumValue(
    val: ValueOfBaseEnums<T> | keyof T,
    defaultValue?: EnumsObject<T>
  ): EnumsObject<T>;
  getEnumValue(
    val: Omit<number, ValueOfBaseEnums<T>> | Omit<string, keyof T>,
    defaultValue?: EnumsObject<T>
  ): EnumsObject<T>;
  getEnumValue(val: number | string, defaultValue?: EnumsObject<T>) {
    if (defaultValue === undefined) {
      defaultValue = this.enumDefaultValue;
    }
    if (Object.values(this.enums).includes(val)) {
      const entriesObj = Object.entries(this.enumsObj);
      for (const [k, v] of entriesObj) {
        if (v.value === val) {
          return this.enumsObj[k];
        }
      }
    } else if (val in this.enumsObj) {
      return this.enumsObj[val as keyof T];
    }
    return defaultValue;
  }
  /**
   * @summary Get options for swagger decorator for this enum
   * @returns ApiPropertyOptions of this enum
   */
  swaggerPropertyOptions(description?: string) {
    return {
      type: Number,
      enum: Object.values(this.enums),
      description: `
--- Enum description ---    
${Object.values(this.enumsObj)
  .map((v) => `value: ${v.value} = [en: ${v.en} , th: ${v.th}]`)
  .join("\n")}
--- description ---
${description}
      `,
    };
  }
}
