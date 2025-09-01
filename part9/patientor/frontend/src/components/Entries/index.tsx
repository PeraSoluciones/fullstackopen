import { Diagnosis, Entry } from '../../types';
import { Typography, Box } from '@mui/material';
import Details from './Details';

interface Props {
  entries: Entry[];
  diagnoses: Diagnosis[];
}
export const Entries = ({ entries, diagnoses }: Props) => {
  return (
    <Box>
      <Typography variant='body2'>
        {entries.map((entry) => (
          <Details key={entry.id} entry={entry} diagnoses={diagnoses} />
        ))}
      </Typography>
    </Box>
  );
};

export default Entries;
