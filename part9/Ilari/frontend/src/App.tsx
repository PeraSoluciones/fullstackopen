import { useEffect, useState } from 'react';
import type { NonSensitiveDiaryEntry } from './types';
import { getAllDiaries } from './services/diaryService';
import FormDiary from './components/FormDiary';
function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  return (
    <div>
      <FormDiary setDiaries={setDiaries} />
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p style={{ marginBottom: '0px' }}>Visibility: {diary.visibility}</p>
          <p style={{ marginTop: '0px' }}>Weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
