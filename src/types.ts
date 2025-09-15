// enum helper

import { Enums, ValueOfBaseEnums } from "./enumsClass";

export type ValueOfEnums<T> = T extends Enums<infer U>
  ? ValueOfBaseEnums<U>
  : never;

export type KeyOfEnums<T> = T extends Enums<infer U> ? keyof U : never;
