import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  IconButton,
} from '@mui/material';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link, useParams } from 'react-router-dom';
import { useUpdateBlog, useRemoveBlog, useBlogs } from '../context/BlogContext';
import NewBlogComment from './forms/NewBlogComment';
// import { useCredentials } from '../context/UserContext';

const Blog = () => {
  // const user = useCredentials();
  const blogs = useBlogs();
  const blogId = useParams().id;
  const updateBlog = useUpdateBlog();
  const removeBlog = useRemoveBlog();

  if (blogs.isLoading) return <div>is loading...</div>;

  if (blogs.isError) return <div>something went wrong...</div>;

  const blog = blogs.data.find((blog) => blog.id === blogId);

  // const blogUser = blog.user?.id ? blog.user.id : blog.user;

  const handleLike = (blog) => {
    updateBlog.mutate({ ...blog, likes: blog.likes + 1 });
  };

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      removeBlog.mutate(blog);
  };

  return (
    <Card>
      <CardHeader title={blog.title} />
      <CardContent>
        <List>
          <ListItem disablePadding>
            <Link to={blog.url} target='_blank'>
              {blog.url}
            </Link>
          </ListItem>
          <ListItem disablePadding>
            <span>{blog.likes + ' likes'} </span>
            <IconButton
              data-testid='button-likes'
              onClick={() => handleLike(blog)}
              color='primary'
            >
              <ThumbUpIcon />
            </IconButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemText primary={'added by ' + blog.author} />
          </ListItem>
        </List>

        <h3>comments</h3>
        <NewBlogComment />
        <List>
          {blog.comments.map((comment, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ModeCommentIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary={comment} />
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* <button
        onClick={() => handleRemove(blog)}
        style={{
          display: user.id === blogUser ? true : 'none',
        }}
      >
        remove
      </button> */}
    </Card>
  );
};

export default Blog;
