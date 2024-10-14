import { useContext, createContext, useCallback, useReducer } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { useNotificationDispatch } from './NotificationContext';
import { handleNotification, sortBlogs } from '../utils/helper';

const BlogContext = createContext();

export const BlogContextProvider = (props) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const createBlogMutation = useMutation({
    mutationFn: ({ ...params }) =>
      blogService.create({
        title: params.title,
        author: params.author,
        url: params.url,
      }),

    onSuccess: (newBlog, { ...params }) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      params.setTitle('');
      params.setAuthor('');
      params.setUrl('');
      handleNotification(notificationDispatch, {
        type: 'success',
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      });
    },
    onError: (error) => {
      handleNotification(notificationDispatch, {
        type: 'error',
        text: error.response.data,
      });
    },
  });

  const addCommentBlogMutation = useMutation({
    mutationFn: (params) =>
      blogService.addComment({ id: params.id, comment: params.comment }),
    onSuccess: (blogUpdated, params) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) =>
          blog.id === blogUpdated.id
            ? { ...blog, comments: blogUpdated.comments }
            : blog
        )
      );
      params.setComment('');
      handleNotification(notificationDispatch, {
        type: 'success',
        text: `comment added!`,
      });
    },
    onError: (error) => {
      handleNotification(notificationDispatch, {
        type: 'error',
        text: error.response.data,
      });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (blogUpdated) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) =>
          blog.id === blogUpdated.id
            ? { ...blog, likes: blogUpdated.likes }
            : blog
        )
      );
      handleNotification(notificationDispatch, {
        type: 'success',
        text: `blog ${blogUpdated.title} by ${blogUpdated.author} updated`,
      });
    },
    onError: (error) => {
      handleNotification(notificationDispatch, {
        type: 'error',
        text: error.response.data,
      });
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: (blog) => {
      blogService.remove(blog.id);
    },
    onSuccess: (blogDeleted, blogToDelete) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((blog) => blog.id !== blogToDelete.id)
      );
      handleNotification(notificationDispatch, {
        type: 'success',
        text: `Blog ${blogToDelete.title} by ${blogToDelete.author} removed`,
      });
    },
    onError: (error) => {
      handleNotification(notificationDispatch, {
        type: 'error',
        text: error.response.data,
      });
    },
  });

  const blogsQueryResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    select: useCallback((blogs) => sortBlogs(blogs), []),
  });

  return (
    <BlogContext.Provider
      value={[
        blogsQueryResult,
        createBlogMutation,
        updateBlogMutation,
        removeBlogMutation,
        addCommentBlogMutation,
      ]}
    >
      {props.children}
    </BlogContext.Provider>
  );
};

export const useBlogs = () => {
  const blogsContext = useContext(BlogContext);
  return blogsContext[0];
};

export const useCreateBlog = () => {
  const blogsContext = useContext(BlogContext);
  return blogsContext[1];
};

export const useUpdateBlog = () => {
  const blogsContext = useContext(BlogContext);
  return blogsContext[2];
};

export const useRemoveBlog = () => {
  const blogsContext = useContext(BlogContext);
  return blogsContext[3];
};

export const useAddCommentBlog = () => {
  const blogsContext = useContext(BlogContext);
  return blogsContext[4];
};
