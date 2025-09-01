import { Male, Female, QuestionMark } from '@mui/icons-material';

const GenderIcon = ({ gender }: { gender: string }) => {
  switch (gender) {
    case 'male':
      return <Male />;
    case 'female':
      return <Female />;
    default:
      return <QuestionMark />;
  }
};

export default GenderIcon;
