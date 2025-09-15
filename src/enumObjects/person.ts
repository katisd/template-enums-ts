import { Enums } from "../enumsClass";

const GenderEnums = {
  Female: {
    value: 2,
    th: "หญิง",
    en: "female",
  },
  Male: {
    value: 1,
    th: "ชาย",
    en: "male",
  },
  Other: {
    value: 0,
    th: "อื่นๆ",
    en: "other",
  },
} as const;

export const Gender = new Enums(GenderEnums);

const ReligionEnums = {
  Christian: {
    value: 20,
    th: "คริสต์",
    en: "christian",
  },
  Muslim: {
    value: 30,
    th: "อิสลาม",
    en: "muslim",
  },
  Hindu: {
    value: 40,
    th: "ฮินดู",
    en: "hindu",
  },
} as const;

export const Religion = new Enums(ReligionEnums);
