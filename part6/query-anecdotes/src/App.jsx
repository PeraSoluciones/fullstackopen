import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';
import { handleNotification } from './utils/helper';

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onsuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      const index = anecdotes.findIndex(
        (anecdote) => anecdote.id === updatedAnecdote.id
      );
      anecdotes[index] = updatedAnecdote;
      queryClient.setQueriesData(['anecdotes'], anecdotes);
    },
  });

  const handleVote = (anecdote) => {
    anecdote.votes++;
    updateAnecdoteMutation.mutate(anecdote);
    handleNotification(dispatch, `anecdote '${anecdote.content}' voted`);
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  // console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) return <div>data is loading...</div>;

  if (result.isError)
    return <div>anecdote service not avaible due to problems in server</div>;

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
