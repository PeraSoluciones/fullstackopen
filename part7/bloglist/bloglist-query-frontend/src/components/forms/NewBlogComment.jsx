import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAddCommentBlog } from '../../context/BlogContext';
import { Button, Stack, TextField } from '@mui/material';

const NewBlogComment = () => {
  const [comment, setComment] = useState('');
  const blogId = useParams().id;
  const addComment = useAddCommentBlog();

  const addCommentToBlog = (event) => {
    event.preventDefault();
    addComment.mutate({ id: blogId, comment, setComment });
  };

  return (
    <>
      <form onSubmit={addCommentToBlog}>
        <Stack direction='row'>
          <TextField
            label='Comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button variant='contained' color='primary' type='submit'>
            add comment
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default NewBlogComment;
