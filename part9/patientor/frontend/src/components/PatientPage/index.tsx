import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useEffect, useState } from 'react';
import { Patient, Diagnosis } from '../../types';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
} from '@mui/material';
import GenderIcon from '../Commons/GenderIcon';
import Entries from '../Entries';
import AddPatientEntryForm from './AddPatientEntryForm';
const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [toggleEntryForm, setToggleEntryForm] = useState(false);
  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id!);
      setPatient(patient);
    };
    void fetchPatient();
  }, []);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient) return <Box component='section'>Patient not found</Box>;
  return (
    <Box component='section'>
      <Typography variant='h5' style={{ marginTop: '1em' }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='ssn' secondary={patient.ssn} />
        </ListItem>
        <ListItem>
          <ListItemText primary='occupation' secondary={patient.occupation} />
        </ListItem>
      </List>
      <Button
        onClick={() => setToggleEntryForm(!toggleEntryForm)}
        sx={{ display: toggleEntryForm ? 'none' : '' }}
      >
        Add Entry
      </Button>
      {toggleEntryForm && (
        <AddPatientEntryForm
          onCancel={() => setToggleEntryForm(false)}
          diagnoses={diagnoses}
          patient={patient}
          updatePatientEntry={setPatient}
        />
      )}
      {patient.entries.length > 0 && (
        <Box component='section'>
          <Typography variant='h6'>Entries</Typography>
          <Entries entries={patient.entries} diagnoses={diagnoses} />
        </Box>
      )}
    </Box>
  );
};

export default PatientPage;
