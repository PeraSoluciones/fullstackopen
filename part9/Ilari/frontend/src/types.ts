export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
  comment: string;
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

export const Weather = ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'];

export const Visibility = ['great', 'good', 'ok', 'poor'];
