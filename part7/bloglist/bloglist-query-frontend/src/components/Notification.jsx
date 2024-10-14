import { Alert } from '@mui/material';
import { useNotificationValue } from '../context/NotificationContext';

const Notification = () => {
  const message = useNotificationValue();
  if (!message.text) return null;

  return (
    <Alert severity={message.type === 'error' ? 'error' : 'success'}>
      {message.text?.error ? message.text?.error : message.text}
    </Alert>
  );
};

export default Notification;
