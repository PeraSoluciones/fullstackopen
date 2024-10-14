import BlogList from './BlogList';
import Togglable from './Togglable';
import NewBlog from './forms/NewBlog';

const Home = () => {
  return (
    <>
      <Togglable buttonLabel='new blog'>
        <NewBlog />
      </Togglable>
      <BlogList />
    </>
  );
};

export default Home;
