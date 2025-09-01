import { Diagnosis, Entry } from '../../types';
import HealthCheck from './HealthCheck';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthCare';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Details = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} diagnoses={diagnoses} />;
    case 'Hospital':
      return <Hospital entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default Details;
