const sortBlogs = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes);
};

const handleNotification = (dispatch, notification) => {
  dispatch({
    type: 'SHOW',
    notification,
  });

  setTimeout(() => {
    dispatch({
      type: 'HIDE',
    });
  }, 2000);
};

export { sortBlogs, handleNotification };
