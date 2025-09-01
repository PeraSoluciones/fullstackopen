import { Box } from '@mui/material';
import { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import Common from './Common';

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '5px',
        margin: '1em 0',
        padding: '1em',
      }}
    >
      <Common entry={entry} diagnoses={diagnoses} />
      <p style={{ margin: '0px' }}>diagnosed by {entry.specialist}</p>
    </Box>
  );
};

export default OccupationalHealthcare;
