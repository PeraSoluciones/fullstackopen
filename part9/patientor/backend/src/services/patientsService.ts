import patients from '../../data/patients';
import { NonSensitivePatient, NewPatientEntry, Patient } from '../types';
import { v4 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = { id, ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };
