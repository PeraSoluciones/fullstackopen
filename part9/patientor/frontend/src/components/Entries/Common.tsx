import { Diagnosis, Entry } from '../../types';
import { Box } from '@mui/material';
import EntryTypeIcon from '../Commons/EntryTypeIcon';

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const Common = ({ entry, diagnoses }: Props) => {
  return (
    <Box>
      <p style={{ display: 'inline', margin: '0px' }}>
        {entry.date} <EntryTypeIcon entryType={entry.type} />
      </p>
      {entry.type === 'OccupationalHealthcare' && (
        <p style={{ display: 'inline', margin: '0px' }}>
          {' '}
          {entry.employerName}
        </p>
      )}
      <p style={{ fontStyle: 'italic', margin: '0px' }}>{entry.description}</p>
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <ul>
          {entry.diagnosisCodes.map((code) => (
            <li key={code}>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Common;
