export type DynamicFieldName =
  | `${string}`
  | `${string}[${number}].${string}`
  | `${string}.${string}`;
