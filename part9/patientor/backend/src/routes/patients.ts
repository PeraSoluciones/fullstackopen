import express from 'express';
import patienService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patienService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patienService.findById(id);
  try {
    if (patient) {
      res.send(patient);
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
    const newPatientEntry = toNewPatient(req.body);
    const addedPatientEntry = patienService.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
  } catch (error: unknown) {
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
    const newEntry = toNewEntry(req.body);
    const addedEntry = patienService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
