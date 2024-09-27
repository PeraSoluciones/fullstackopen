import { createSlice } from '@reduxjs/toolkit';
import { sortAnecdotes } from '../utils/helper';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const index = state.findIndex(
        (anecdote) => anecdote.id === action.payload.id
      );
      state[index] = action.payload;
      state.sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
      // state.sort(sortAnecdotes);
    },
    setAnecdotes(state, action) {
      return action.payload.sort(sortAnecdotes);
    },
  },
});

export const { updateAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(anecdote));
  };
};

export const voteAnecdote = (data) => {
  return async (dispatch) => {
    const anecdoteToChange = { ...data };
    anecdoteToChange.votes++;
    const anecdote = await anecdoteService.updateOne(anecdoteToChange);
    dispatch(updateAnecdote(anecdote));
  };
};
export default anecdoteSlice.reducer;
