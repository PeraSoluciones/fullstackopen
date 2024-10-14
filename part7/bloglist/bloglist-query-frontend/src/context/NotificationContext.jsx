import { useReducer, useContext, createContext } from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.notification;
    case 'HIDE':
      return '';
    default:
      return '';
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationContext = useContext(NotificationContext);
  return notificationContext[0];
};

export const useNotificationDispatch = () => {
  const notificationContext = useContext(NotificationContext);
  return notificationContext[1];
};
