"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewDiagnosis = exports.toNewPatient = void 0;
const types_1 = require("./types");
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const newPatient = {
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
exports.toNewPatient = toNewPatient;
const parseName = (name) => {
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseSpecialist = (specialist) => {
    if (!isString(specialist)) {
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};
const parseDescription = (description) => {
    if (!isString(description)) {
        throw new Error('Incorrect or missing description');
    }
    return description;
};
const parseDate = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseDiagnosisCodes = (object) => {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
        return [];
    }
    return object.diagnosisCodes;
};
const parseCode = (code) => {
    if (!isString(code) || !isEntryType(code)) {
        throw new Error('Incorrect or missing code');
    }
    return code;
};
const parseType = (type) => {
    if (!isString(type) || !isEntryType(type)) {
        throw new Error('Incorrect or missing type');
    }
    return type;
};
const parseHealthCheckRating = (rating) => {
    if (typeof rating !== 'number' || rating < 0 || rating > 3) {
        throw new Error('Incorrect or missing healthCheckRating');
    }
    return rating;
};
const parseDischarge = (discharge) => {
    if (!discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !('criteria' in discharge)) {
        throw new Error('Incorrect or missing discharge');
    }
    return {
        date: parseDate(discharge.date),
        criteria: parseDescription(discharge.criteria),
    };
};
const parseEmployerName = (employerName) => {
    if (!isString(employerName)) {
        throw new Error('Incorrect or missing employerName');
    }
    return employerName;
};
const parseSickLeave = (sickLeave) => {
    if (!sickLeave)
        return undefined;
    if (typeof sickLeave !== 'object' ||
        !('startDate' in sickLeave) ||
        !('endDate' in sickLeave)) {
        throw new Error('Incorrect sickLeave');
    }
    return {
        startDate: parseDate(sickLeave.startDate),
        endDate: parseDate(sickLeave.endDate),
    };
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isSSN = (ssn) => {
    return ssn.length === 11;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const isEntryType = (param) => {
    return Object.values(types_1.EntryType)
        .map((v) => v.toString())
        .includes(param);
};
const toNewDiagnosis = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('code' in object && 'name' in object) {
        const newDiagnosisEntry = {
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
exports.toNewDiagnosis = toNewDiagnosis;
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('date' in object &&
        'description' in object &&
        'specialist' in object &&
        // 'diagnosisCodes' in object &&
        'type' in object) {
        const type = parseType(object.type);
        console.log('Processing entry type:', type);
        console.log('Object properties:', Object.keys(object));
        const baseEntry = {
            date: parseDate(object.date),
            description: parseDescription(object.description),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            type,
        };
        switch (type) {
            case types_1.EntryType.HealthCheck:
                if (!('healthCheckRating' in object)) {
                    throw new Error('Missing healthCheckRating for HealthCheck entry');
                }
                return Object.assign(Object.assign({}, baseEntry), { healthCheckRating: parseHealthCheckRating(object.healthCheckRating) });
            case types_1.EntryType.Hospital:
                if (!('discharge' in object)) {
                    throw new Error('Missing discharge for Hospital entry');
                }
                return Object.assign(Object.assign({}, baseEntry), { discharge: parseDischarge(object.discharge) });
            case types_1.EntryType.OccupationalHealthcare:
                if (!('employerName' in object)) {
                    throw new Error('Missing employerName for OccupationalHealthcare entry');
                }
                return Object.assign(Object.assign({}, baseEntry), { employerName: parseEmployerName(object.employerName), sickLeave: parseSickLeave(object.sickLeave) });
            default:
                throw new Error('Unknown entry type');
        }
    }
    throw new Error('Incorrect data: a field missing');
};
exports.toNewEntry = toNewEntry;
