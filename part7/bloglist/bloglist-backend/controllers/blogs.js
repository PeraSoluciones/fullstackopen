const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  if (!request.token)
    return response.status(401).json({ error: 'Unauthorized' });

  const blog = new Blog(request.body);

  if (blog.get('title') === '' || blog.get('url') === '') {
    response.status(400).json('missing title or url').end();
    return;
  }

  if (blog.get('likes') === undefined) blog.set('likes', 0);

  const user = request.user;

  blog.set('user', user._id);
  const blogSaved = await blog.save();

  user.blogs = user.blogs.concat(blogSaved._id);
  await user.save();

  response.status(201).json(blogSaved);
});

blogsRouter.post('/:id/comments', async (request, response) => {
  if (!request.token)
    return response.status(401).json({ error: 'Unauthorized' });

  const data = request.body;

  const blog = await Blog.findById(request.params.id);

  blog.comments.push(data.comment);

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(201).json(updatedBlog);
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    if (!request.token)
      return response.status(401).json({ error: 'Unauthorized' });

    const blog = await Blog.findById(request.params.id);

    const user = request.user;

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else response.status(400).json({ error: 'Authorization error' });
  }
);

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  if (!request.token)
    return response.status(401).json({ error: 'Unauthorized' });

  const body = request.body;
  const user = request.user;

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user._id,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.status(201).json(updatedBlog);
});

module.exports = blogsRouter;
