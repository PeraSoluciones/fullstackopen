import { Card, CardContent, List, ListItem } from '@mui/material';
import { useBlogs } from '../context/BlogContext';
import ListItemLink from './ListItemLink';
const BlogList = () => {
  const blogs = useBlogs();

  if (blogs.isLoading) return <div>data is loading...</div>;

  if (blogs.isError) return <div>something went wrong...</div>;

  return (
    <Card elevation={3}>
      <CardContent>
        <List>
          {blogs.data.map((blog) => (
            <ListItem key={blog.id} disablePadding>
              <ListItemLink to={`/blogs/${blog.id}`} primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default BlogList;
