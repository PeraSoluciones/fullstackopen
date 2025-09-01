export const parseString = (str: unknown): string => {
  if (!isString(str)) {
    throw new Error('Incorrect or missing string');
  }
  return str;
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}