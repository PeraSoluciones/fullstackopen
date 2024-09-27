import { useNotificationDispatch } from '../NotificationContext';

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const handleNotification = (dispatch, text) => {
  dispatch({
    type: 'SHOW',
    notification: text,
  });

  setTimeout(() => {
    dispatch({
      type: 'HIDE',
    });
  }, 5000);
};
