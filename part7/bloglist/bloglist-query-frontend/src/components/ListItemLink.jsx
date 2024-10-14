import { ListItemText, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

const ListItemLink = (props) => {
  const { primary, to } = props;
  return (
    <ListItemButton component={Link} to={to} disableGutters>
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};

export default ListItemLink;
