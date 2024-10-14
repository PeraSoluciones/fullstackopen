import { useParams } from 'react-router-dom';
import { useUsersQuery } from '../hooks/users';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import ListItemLink from './ListItemLink';
import PostAddIcon from '@mui/icons-material/PostAdd';

const UserBlogs = () => {
  const users = useUsersQuery();
  const userId = useParams().id;

  if (users.isLoading) return <div>is loading...</div>;

  if (users.isError) return <div>something went wrong...</div>;

  const user = users.data.find((user) => user.id === userId);

  return (
    <Card>
      <CardHeader title={user.name} />
      <CardContent>
        <h3>added blogs</h3>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id} disablePadding>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <PostAddIcon fontSize='small' />
              </ListItemIcon>
              <ListItemLink to={`/blogs/${blog.id}`} primary={blog.title} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UserBlogs;
