const sortAnecdotes = (a, b) => {
  const contentA = a.content.toLowerCase();
  const contentB = b.content.toLowerCase();
  if (contentA < contentB) return -1;
  if (contentA > contentB) return 1;
  return 0;
};

export { sortAnecdotes };
