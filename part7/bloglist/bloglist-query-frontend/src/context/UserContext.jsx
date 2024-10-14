import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useReducer } from 'react';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { useNotificationDispatch } from './NotificationContext';
import { handleNotification } from '../utils/helper';

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.credentials;
    case 'LOGOUT':
      return null;
    default:
      return null;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const [userValue, userDispatch] = useReducer(loginReducer, null);

  const loginMutation = useMutation({
    mutationFn: ({ ...params }) =>
      loginService.login({
        username: params.username,
        password: params.password,
      }),
    onSuccess: (credentials, { ...params }) => {
      queryClient.setQueryData(['user'], credentials);
      userDispatch({ type: 'LOGIN', credentials });
      window.localStorage.setItem(
        'loggedBloglistappUser',
        JSON.stringify(credentials)
      );

      blogService.setToken(credentials.token);
      params.setUsername('');
      params.setPassword('');
      handleNotification(notificationDispatch, {
        type: 'success',
        text: `Wellcome ${credentials.name}`,
      });
    },
    onError: (error) => {
      handleNotification(notificationDispatch, {
        type: 'error',
        text: error.response.data,
      });
    },
  });

  const initializeUser = (credentials) =>
    userDispatch({ type: 'LOGIN', credentials });

  const logout = () => {
    userDispatch({ type: 'LOGOUT' });
  };

  return (
    <UserContext.Provider
      value={[loginMutation, initializeUser, logout, userValue]}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export const useLogin = () => {
  const login = useContext(UserContext);
  return login[0];
};

export const useInitializeUser = () => {
  const login = useContext(UserContext);
  return login[1];
};

export const useLogout = () => {
  const login = useContext(UserContext);
  return login[2];
};

export const useCredentials = () => {
  const credentials = useContext(UserContext);
  return credentials[3];
};
