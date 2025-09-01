import express from 'express';
import diagnosesService from '../services/diagnosesService';
import { toNewDiagnosis } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const diagnosis = diagnosesService.findById(id);
  try {
    if (diagnosis) {
      res.send(diagnosis);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req, res) => {
  try {
    const newDiagnosisEntry = toNewDiagnosis(req.body);
    const addedDiagnosisEntry = diagnosesService.addEntry(newDiagnosisEntry);
    res.json(addedDiagnosisEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
