import axios from 'axios';
import { EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const addEntry = async (id: string, entry: EntryWithoutId) => {
  try {
    const { data } = await axios.post<EntryWithoutId>(
      `${apiBaseUrl}/patients/${id}/entries`,
      entry
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return { error: error.response?.data };
    } else {
      return { error: 'Unknown error' };
    }
  }
};

export default {
  getAll,
  create,
  getOne,
  addEntry,
};
