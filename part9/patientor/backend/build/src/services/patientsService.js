"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid_1 = require("uuid");
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: [],
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v4)();
    const newPatientEntry = Object.assign({ id }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const findById = (id) => {
    const entry = patients_1.default.find((p) => p.id === id);
    return entry;
};
const addEntry = (patientId, entry) => {
    var _a, _b;
    const id = (0, uuid_1.v4)();
    const newEntry = Object.assign({ id }, entry);
    (_b = (_a = patients_1.default.find((p) => p.id === patientId)) === null || _a === void 0 ? void 0 : _a.entries) === null || _b === void 0 ? void 0 : _b.push(newEntry);
    return newEntry;
};
exports.default = { getPatients, addPatient, findById, addEntry };
