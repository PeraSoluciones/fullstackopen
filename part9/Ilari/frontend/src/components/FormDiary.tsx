import type {
  DiaryEntry,
  NewDiaryEntry,
  ValidationError,
  NonSensitiveDiaryEntry,
} from '../types';
import { Visibility, Weather } from '../types';
import RadioButton from './RadioButton';
import { useState } from 'react';
import { createDiary } from '../services/diaryService';
import { parseString } from '../utils';
import axios from 'axios';

const FormDiary = ({
  setDiaries,
}: {
  setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>;
}) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleVisibilityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVisibility(event.target.value);
  };

  const handleWeatherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    try {
      const addedDiaryEntry: DiaryEntry = await createDiary(newDiaryEntry);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
      setError('');
      setDiaries((diaries) => [...diaries, addedDiaryEntry]);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
        setError(parseString(error.response?.data));
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type='date' value={date} onChange={handleDateChange} />
        </div>
        <div>
          <label>Visibility: </label>
          {Visibility.map((option) => (
            <RadioButton
              name={'visibility'}
              onChange={handleVisibilityChange}
              value={option}
            />
          ))}
        </div>
        <div>
          <label>Weather: </label>
          {Weather.map((option) => (
            <RadioButton
              name={'weather'}
              onChange={handleWeatherChange}
              value={option}
            />
          ))}
        </div>
        <div>
          <label>Comment:</label>
          <input type='text' value={comment} onChange={handleCommentChange} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default FormDiary;
