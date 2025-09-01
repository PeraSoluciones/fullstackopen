import {
  NewPatientEntry,
  Gender,
  Diagnosis,
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from './types';

export const toNewPatient = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect data: a field missing');
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseCode = (code: unknown): string => {
  if (!isString(code) || !isEntryType(code)) {
    throw new Error('Incorrect or missing code');
  }
  return code;
};

const parseType = (type: unknown): EntryType => {
  if (!isString(type) || !isEntryType(type)) {
    throw new Error('Incorrect or missing type');
  }
  return type;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== 'number' || rating < 0 || rating > 3) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return rating as HealthCheckRating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== 'object' ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  ) {
    throw new Error('Incorrect or missing discharge');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseDescription(discharge.criteria),
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }
  return employerName;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (!sickLeave) return undefined;
  if (
    typeof sickLeave !== 'object' ||
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave)
  ) {
    throw new Error('Incorrect sickLeave');
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate),
  };
};
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSSN = (ssn: string): boolean => {
  return ssn.length === 11;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const isEntryType = (param: string): param is EntryType => {
  return Object.values(EntryType)
    .map((v) => v.toString())
    .includes(param);
};

export const toNewDiagnosis = (object: unknown): Diagnosis => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('code' in object && 'name' in object) {
    const newDiagnosisEntry: Diagnosis = {
      code: parseCode(object.code),
      name: parseName(object.name),
    };
    if ('latin' in object) {
      newDiagnosisEntry.latin = parseName(object.latin);
    }
    return newDiagnosisEntry;
  }
  throw new Error('Incorrect data: a field missing');
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'date' in object &&
    'description' in object &&
    'specialist' in object &&
    // 'diagnosisCodes' in object &&
    'type' in object
  ) {
    const type = parseType(object.type);

    const baseEntry = {
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
      diagnosisCodes: parseDiagnosisCodes(
        object as Record<Diagnosis['code'], unknown>
      ),
      type,
    };

    switch (type) {
      case EntryType.HealthCheck:
        if (!('healthCheckRating' in object)) {
          throw new Error('Missing healthCheckRating for HealthCheck entry');
        }
        return {
          ...baseEntry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        } as EntryWithoutId;
      case EntryType.Hospital:
        if (!('discharge' in object)) {
          throw new Error('Missing discharge for Hospital entry');
        }
        return {
          ...baseEntry,
          discharge: parseDischarge(object.discharge),
        } as EntryWithoutId;
      case EntryType.OccupationalHealthcare:
        if (!('employerName' in object)) {
          throw new Error(
            'Missing employerName for OccupationalHealthcare entry'
          );
        }
        const occupationalHealthcareEntry = {
          ...baseEntry,
          employerName: parseEmployerName(
            (object as Record<string, unknown>).employerName
          ),
        };
        if (!('sickLeave' in object)) {
          return occupationalHealthcareEntry as EntryWithoutId;
        } else {
          return {
            ...occupationalHealthcareEntry,
            sickLeave: parseSickLeave(
              (object as Record<string, unknown>).sickLeave
            ),
          } as EntryWithoutId;
        }
      default:
        throw new Error('Unknown entry type');
    }
  }
  throw new Error('Incorrect data: a field missing');
};
