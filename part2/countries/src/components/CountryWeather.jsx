import { useEffect, useState } from 'react';
import getData from '../services/weather';

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    getData(country.latlng[0], country.latlng[1]).then((result) =>
      setWeather(result)
    );
  }, [country]);

  return (
    <div>
      <h3>Weather in {country.name.common}</h3>
      <p>Temperature {weather?.main?.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather?.weather[0]?.icon}@2x.png`}
        alt={country.name.common}
      />
      <p>Wind {weather?.wind?.speed} m/s</p>
    </div>
  );
};
export default CountryWeather;
