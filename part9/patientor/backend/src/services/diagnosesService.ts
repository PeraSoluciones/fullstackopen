import diaganoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Diagnosis[] => {
  return diaganoses;
};

const addEntry = () => {
  return null;
};

export default { getEntries, addEntry };
