import transform from "lodash/transform";
import isPlainObject from "lodash/isPlainObject";
import isEmpty from "lodash/isEmpty";

interface CleanOptions {
  cleanKeys?: string[];
  cleanValues?: unknown[];
  emptyArrays?: boolean;
  emptyObjects?: boolean;
  emptyStrings?: boolean;
  NaNValues?: boolean;
  nullValues?: boolean;
  undefinedValues?: boolean;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const cleanDeepObject = <T extends Record<string, unknown>>(
  object: T,
  {
    cleanKeys = [],
    cleanValues = [],
    emptyArrays = true,
    emptyObjects = true,
    emptyStrings = true,
    NaNValues = false,
    nullValues = true,
    undefinedValues = true,
  }: CleanOptions = {},
): DeepPartial<T> => {
  return transform(object, (result, value, key) => {
    // Exclude specific keys
    if (cleanKeys.includes(key)) {
      return;
    }

    // Recurse into arrays and objects
    if (Array.isArray(value) || isPlainObject(value)) {
      value = cleanDeepObject(value as Record<string, unknown>, {
        NaNValues,
        cleanKeys,
        cleanValues,
        emptyArrays,
        emptyObjects,
        emptyStrings,
        nullValues,
        undefinedValues,
      });
    }

    // Exclude specific values
    if (cleanValues.includes(value)) {
      return;
    }

    // Exclude empty objects
    if (emptyObjects && isPlainObject(value) && isEmpty(value)) {
      return;
    }

    // Exclude empty arrays
    if (emptyArrays && Array.isArray(value) && !value.length) {
      return;
    }

    // Exclude empty strings
    if (emptyStrings && value === "") {
      return;
    }

    // Exclude NaN values
    if (NaNValues && Number.isNaN(value as number)) {
      return;
    }

    // Exclude null values
    if (nullValues && value === null) {
      return;
    }

    // Exclude undefined values
    if (undefinedValues && value === undefined) {
      return;
    }

    // Append when recursing arrays
    if (Array.isArray(result)) {
      return result.push(value);
    }

    (result as Record<string, unknown>)[key] = value;
  });
};
