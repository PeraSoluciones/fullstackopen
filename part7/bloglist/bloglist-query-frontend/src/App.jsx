import { useEffect } from 'react';
import blogService from './services/blogs';
import Login from './components/forms/Login';
import { useCredentials, useInitializeUser } from './context/UserContext';
import Header from './layout/Header';
import Users from './components/Users';
import { Routes, Route } from 'react-router-dom';
import UserBlogs from './components/UserBlogs';
import Blog from './components/Blog';
import Home from './components/Home';
import { Container } from '@mui/material';

const App = () => {
  const user = useCredentials();
  const initializeUser = useInitializeUser();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      initializeUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <Container>
      {!user ? (
        <Login />
      ) : (
        <div data-testid='blogs'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserBlogs />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </div>
      )}
    </Container>
  );
};

export default App;
