export const isNotNumber = (value: string): boolean => isNaN(Number(value));

export const isArrayOfNumbers = (values: string[]): boolean =>
    values.every((value) => !isNotNumber(value));
