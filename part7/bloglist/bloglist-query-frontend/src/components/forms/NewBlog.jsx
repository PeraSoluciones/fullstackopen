import { useState } from 'react';
import { useCreateBlog } from '../../context/BlogContext';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from '@mui/material';

const NewBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const createBlog = useCreateBlog();

  const addBlog = (event) => {
    event.preventDefault();
    createBlog.mutate({ title, author, url, setTitle, setAuthor, setUrl });
  };

  return (
    <Card sx={{ marginBottom: 5 }}>
      <CardContent>
        <CardHeader title='Create new' />
        <form onSubmit={addBlog}>
          <Stack sx={{ width: 0.4 }} spacing={2}>
            <TextField
              data-testid='input-title'
              label='Title'
              name='Title'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
            <TextField
              data-testid='input-author'
              label='Author'
              name='Author'
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
            <TextField
              data-testid='input-url'
              label='Url'
              name='Url'
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
            <Button variant='contained' type='submit' data-testid='submit'>
              Create
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewBlog;
