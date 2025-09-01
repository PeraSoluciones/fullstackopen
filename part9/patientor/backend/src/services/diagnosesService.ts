import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export const findById = (id: string): Diagnosis | undefined => {
  return diagnoses.find((d) => d.code === id);
};

const addEntry = (entry: Diagnosis) => {
  diagnoses.push(entry);
  return entry;
};

export default { getEntries, addEntry, findById };
