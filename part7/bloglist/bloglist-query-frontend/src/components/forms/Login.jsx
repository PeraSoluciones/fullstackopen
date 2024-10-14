import { useState } from 'react';
import Notification from '../Notification';
import { useLogin } from '../../context/UserContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const login = useLogin();

  const handleLogin = async (event) => {
    event.preventDefault();
    login.mutate({ username, password, setUsername, setPassword });
  };

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Card data-testid='login' sx={{ width: 0.4 }}>
        <CardContent>
          <Notification />
          <CardHeader title='Log in to application' />
          <form onSubmit={handleLogin}>
            <Stack spacing={2}>
              <TextField
                label='username'
                data-testid='username'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
              <TextField
                label='password'
                type='password'
                data-testid='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <Button variant='contained' color='primary' type='submit'>
                login
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
