import { Diagnosis, HospitalEntry } from '../../types';
import { Box } from '@mui/material';
import Common from './Common';

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const Hospital = ({ entry, diagnoses }: Props) => {
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
      <p style={{ margin: '0px' }}>
        discharged on {entry.discharge.date} by {entry.discharge.criteria}
      </p>
    </Box>
  );
};

export default Hospital;
