import patients from '../../data/patients';
import {
  NonSensitivePatient,
  NewPatientEntry,
  Patient,
  EntryWithoutId,
} from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries: [],
  }));
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatient => {
  const id = uuid();
  const newPatientEntry = { id, ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addEntry = (patientId: string, entry: EntryWithoutId) => {
  const id = uuid();
  const newEntry = { id, ...entry };
  patients.find((p) => p.id === patientId)?.entries?.push(newEntry);
  return newEntry;
};

export default { getPatients, addPatient, findById, addEntry };
