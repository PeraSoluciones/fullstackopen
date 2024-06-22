import axios from 'axios';

const api_key = import.meta.env.VITE_SOME_KEY;
const baseURL = `https://api.openweathermap.org/data/2.5/weather`;

const getData = (lat, lon) => {
  const query = `?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
  const data = axios.get(baseURL + query);
  return data.then((response) => response.data);
};

export default getData;
