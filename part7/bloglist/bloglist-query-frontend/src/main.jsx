import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { NotificationContextProvider } from './context/NotificationContext';
import { BlogContextProvider } from './context/BlogContext';
import { UserContextProvider } from './context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <BlogContextProvider>
          <UserContextProvider>
            <App />
          </UserContextProvider>
        </BlogContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </Router>
);
