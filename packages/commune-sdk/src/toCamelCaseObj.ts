import type { AnyKindOfDictionary } from "lodash";
import { camelCase, mapKeys } from "lodash";

export function toCamelCaseObj<T>(data: AnyKindOfDictionary): T {
  return mapKeys(data, (_, key) => camelCase(key) as unknown) as T;
}
