"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientsService_1 = __importDefault(require("../services/patientsService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.getPatients());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientsService_1.default.findById(id);
    try {
        if (patient) {
            res.send(patient);
        }
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatient)(req.body);
        const addedPatientEntry = patientsService_1.default.addPatient(newPatientEntry);
        res.json(addedPatientEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientsService_1.default.addEntry(id, newEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
