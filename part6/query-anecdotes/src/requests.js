import axios from 'axios';
import { asObject } from './utils/helper';

const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (anecdote) =>
  axios.post(baseUrl, asObject(anecdote)).then((res) => res.data);

export const updateAnecdote = (anecdote) => {
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data);
};
