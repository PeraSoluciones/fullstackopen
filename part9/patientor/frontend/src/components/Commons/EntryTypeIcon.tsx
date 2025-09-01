import { Work, MedicalServices, LocalHospital } from '@mui/icons-material';

const EntryTypeIcon = ({ entryType }: { entryType: string }) => {
  switch (entryType) {
    case 'HealthCheck':
      return <MedicalServices />;
    case 'OccupationalHealthcare':
      return <Work />;
    case 'Hospital':
      return <LocalHospital />;
    default:
      return null;
  }
};

export default EntryTypeIcon;
