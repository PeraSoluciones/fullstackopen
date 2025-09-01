import { Diagnosis, HealthCheckEntry } from '../../types';
import HealthRatingBar from '../HealthRatingBar';
import { Box } from '@mui/material';
import Common from './Common';

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}
const HealthCheck = ({ entry, diagnoses }: Props) => {
  const rating = entry.healthCheckRating;
  return (
    <Box
      sx={{
        border: '1px solid black',
        borderRadius: '5px',
        margin: '0.5em 0',
        padding: '1em',
      }}
    >
      <Common entry={entry} diagnoses={diagnoses} />
      <HealthRatingBar rating={rating} showText={false} />
      <p style={{ margin: '0px' }}>diagnosed by {entry.specialist}</p>
    </Box>
  );
};

export default HealthCheck;
