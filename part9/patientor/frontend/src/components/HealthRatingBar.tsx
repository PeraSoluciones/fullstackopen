import { Rating } from '@mui/material';
import { Favorite } from '@mui/icons-material';

import { styled } from '@mui/material/styles';

type BarProps = {
  rating: number;
  showText: boolean;
  readOnly?: boolean;
  maxValue?: number;
  onChange?: (value: number) => void;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
});

const HEALTHBAR_TEXTS = [
  'The patient is in great shape',
  'The patient has a low risk of getting sick',
  'The patient has a high risk of getting sick',
  'The patient has a diagnosed condition',
];

const HealthRatingBar = ({
  rating,
  showText,
  readOnly,
  maxValue = 1,
  onChange,
}: BarProps) => {
  return (
    <div className='health-bar'>
      <StyledRating
        readOnly={readOnly}
        value={rating}
        max={maxValue}
        icon={<Favorite fontSize='inherit' color='warning' />}
        emptyIcon={<Favorite fontSize='inherit' color='success' />}
        onChange={(_, value) => onChange && onChange(value as number)}
      />

      {showText ? <p>{HEALTHBAR_TEXTS[rating]}</p> : null}
    </div>
  );
};

export default HealthRatingBar;
