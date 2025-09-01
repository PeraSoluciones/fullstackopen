import { useState } from 'react';
import {
  Box,
  Button,
  Select,
  TextField,
  MenuItem,
  Stack,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Input,
  FormGroup,
  FormLabel,
  Typography,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import {
  Diagnosis,
  Entry,
  EntryType,
  HealthCheckRating,
  EntryWithoutId,
  Patient,
} from '../../types';
import HealthRatingBar from '../HealthRatingBar';
import servicesPatients from '../../services/patients';
interface Props {
  onCancel: () => void;
  diagnoses: Diagnosis[];
  patient: Patient;
  updatePatientEntry: React.Dispatch<React.SetStateAction<Patient | null>>;
}

interface Message {
  message: string;
  type: string;
}
const AddPatientEntryForm = ({
  onCancel,
  diagnoses,
  patient,
  updatePatientEntry,
}: Props) => {
  const [description, setDesciption] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisSelected, setDiagnosisSelected] = useState<string[]>([]);
  const [type, setType] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  const [toggleEntryForm, setToggleEntryForm] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const ITEM_HEIGHT = 40;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChangeType = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
    setToggleEntryForm(true);
  };

  const handleChangeDiagnosis = (event: SelectChangeEvent<string[]>) => {
    const selectedDiagnosis = event.target.value as string[];
    setDiagnosisSelected(selectedDiagnosis);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisSelected,
    };
    let newEntry = {};
    if (type === EntryType.Hospital) {
      newEntry = {
        ...baseEntry,
        type,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      };
    } else if (type === EntryType.OccupationalHealthcare) {
      newEntry = {
        ...baseEntry,
        type,
        employerName,
      };
      if (sickLeaveStartDate && sickLeaveEndDate) {
        newEntry = {
          ...newEntry,
          sickLeave: {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          },
        };
      }
    } else if (type === EntryType.HealthCheck) {
      newEntry = {
        ...baseEntry,
        type,
        healthCheckRating,
      };
    }
    const response = await servicesPatients.addEntry(
      patient.id,
      newEntry as EntryWithoutId
    );
    if ('error' in response) {
      setMessage({
        message: response.error as string,
        type: 'error',
      });
      return;
    }

    updatePatientEntry({
      ...patient,
      entries: [...patient.entries, response as Entry],
    });

    setMessage({
      message: 'Entry added successfully',
      type: 'success',
    });

    setTimeout(() => {
      onCancel();
    }, 1000);
  };

  return (
    <Box
      component='form'
      sx={{ p: 2, border: '1px dashed black', borderRadius: '5px' }}
      onSubmit={handleSubmit}
    >
      <Box>
        <FormControl fullWidth>
          <InputLabel id='type'>Type</InputLabel>
          <Select label='type' value={type} onChange={handleChangeType}>
            {Object.values(EntryType).map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          open={!!message}
          autoHideDuration={6000}
          onClose={() => setMessage(null)}
        >
          <Alert
            onClose={() => setMessage(null)}
            severity={message?.type as AlertColor}
            sx={{ width: '100%' }}
          >
            {message?.message}
          </Alert>
        </Snackbar>
        <Box sx={{ display: toggleEntryForm ? '' : 'none', mt: 2 }}>
          {type === EntryType.HealthCheck && (
            <Typography variant='h6'>New Health Check Entry</Typography>
          )}
          {type === EntryType.OccupationalHealthcare && (
            <Typography variant='h6'>
              New Occupational Healthcare Entry
            </Typography>
          )}
          {type === EntryType.Hospital && (
            <Typography variant='h6'>New Hospital Entry</Typography>
          )}

          <Stack spacing={2}>
            <TextField
              required
              variant='standard'
              label='Description'
              value={description}
              onChange={({ target }) => setDesciption(target.value)}
            />
            <FormControl variant='standard'>
              <InputLabel htmlFor='date' shrink>
                Date
              </InputLabel>
              <Input
                required
                id='date'
                value={date}
                onChange={({ target }) => setDate(target.value)}
                type='date'
              />
            </FormControl>
            <TextField
              required
              variant='standard'
              label='Specialist'
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <FormControl sx={{ m: 1 }}>
              <InputLabel id='multiple-checkbox-label'>Tag</InputLabel>
              <Select
                labelId='multiple-checkbox-label'
                id='multiple-checkbox'
                multiple
                value={diagnosisSelected}
                onChange={handleChangeDiagnosis}
                input={<OutlinedInput label='Diagnoses' />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {diagnoses.map((d) => (
                  <MenuItem key={d.code} value={d.code}>
                    <Checkbox checked={diagnosisSelected.includes(d.code)} />
                    <ListItemText primary={d.code} secondary={d.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {type === EntryType.HealthCheck && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <HealthRatingBar
                  rating={healthCheckRating}
                  showText={false}
                  readOnly={false}
                  maxValue={Object.entries(HealthCheckRating).length / 2}
                  onChange={setHealthCheckRating}
                />
              </Box>
            )}
            {type === EntryType.Hospital && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormLabel>Discharge</FormLabel>
                <FormGroup sx={{ pl: 2 }}>
                  <FormControl variant='standard'>
                    <InputLabel htmlFor='discharge-date' shrink>
                      Date
                    </InputLabel>
                    <Input
                      required
                      id='discharge-date'
                      value={dischargeDate}
                      onChange={({ target }) => setDischargeDate(target.value)}
                      type='date'
                    />
                  </FormControl>
                  <TextField
                    required
                    variant='standard'
                    label='Criteria'
                    value={dischargeCriteria}
                    onChange={({ target }) =>
                      setDischargeCriteria(target.value)
                    }
                  />
                </FormGroup>
              </Box>
            )}
            {type === EntryType.OccupationalHealthcare && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField
                  required
                  variant='standard'
                  label='Employer name'
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />
                <FormLabel>Sick leave</FormLabel>
                <FormGroup sx={{ pl: 2 }}>
                  <FormControl variant='standard'>
                    <InputLabel htmlFor='sick-leave-start-date' shrink>
                      Start date
                    </InputLabel>
                    <Input
                      id='sick-leave-start-date'
                      value={sickLeaveStartDate}
                      onChange={({ target }) =>
                        setSickLeaveStartDate(target.value)
                      }
                      type='date'
                    />
                  </FormControl>
                  <FormControl variant='standard'>
                    <InputLabel htmlFor='sick-leave-end-date' shrink>
                      End date
                    </InputLabel>
                    <Input
                      id='sick-leave-end-date'
                      value={sickLeaveEndDate}
                      onChange={({ target }) =>
                        setSickLeaveEndDate(target.value)
                      }
                      type='date'
                    />
                  </FormControl>
                </FormGroup>
              </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant='contained'
                onClick={onCancel}
                color={'secondary'}
              >
                Cancel
              </Button>
              <Button type='submit' variant='contained'>
                add
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
export default AddPatientEntryForm;
