"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diagnosesService_1.default.getEntries());
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const diagnosis = diagnosesService_1.default.findById(id);
    try {
        if (diagnosis) {
            res.send(diagnosis);
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
        const newDiagnosisEntry = (0, utils_1.toNewDiagnosis)(req.body);
        const addedDiagnosisEntry = diagnosesService_1.default.addEntry(newDiagnosisEntry);
        res.json(addedDiagnosisEntry);
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
