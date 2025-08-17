"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = void 0;
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
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isSSN = (ssn) => {
    return ssn.length === 11 && !isNaN(Number(ssn));
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
exports.default = exports.toNewPatient;
