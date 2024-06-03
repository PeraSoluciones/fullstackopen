import { useState } from 'react';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [counter, setCounter] = useState({});

  const selectAnecdote = () => {
    const index = Math.floor(Math.random() * 8);
    setSelected(index);
  };
  const handleCounter = () => {
    const copy = { ...counter };
    Object.hasOwn(copy, selected)
      ? (copy[selected] += 1)
      : (copy[selected] = 1);
    setCounter(copy);
  };
  const Display = ({ text }) => <h1>{text}</h1>;
  const MostVoted = () => {
    const maxVotes = Object.entries(counter).sort((a, b) => {
      return b[1] - a[1];
    })[0];
    if (maxVotes)
      return (
        <div>
          <p>{anecdotes[maxVotes[0]]}</p>
          <p>has {maxVotes[1]} votes</p>
        </div>
      );

    return (
      <div>
        <p>{anecdotes[0]}</p>
        <p>has 0 votes</p>
      </div>
    );
  };

  return (
    <div>
      <Display text={'Anecdote of the day'} />
      <p>{anecdotes[selected]}</p>
      <p>has {counter[selected] ? counter[selected] : 0} votes</p>
      <button onClick={handleCounter}>vote</button>
      <button onClick={selectAnecdote}>next anecdote</button>
      <Display text={'Anecdote with most votes'} />
      <MostVoted />
    </div>
  );
};

export default App;
