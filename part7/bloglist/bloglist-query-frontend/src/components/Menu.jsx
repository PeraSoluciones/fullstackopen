import { Link } from 'react-router-dom';
import { useCredentials, useLogout } from '../context/UserContext';
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material';

const Menu = () => {
  const user = useCredentials();
  const logout = useLogout();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistappUser');
    logout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='menu'
            ></IconButton>
            <Button color='inherit' component={Link} to='/'>
              blogs
            </Button>
            <Button color='inherit' component={Link} to='/users'>
              users
            </Button>
          </Box>
          <Box>
            <span>{user.name} logged in</span>{' '}
            <Button color='inherit' onClick={handleLogout}>
              logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Menu;
